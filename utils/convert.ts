import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FileActions, VideoInputSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import {
  customVideoCompressionCommand,
  twitterCompressionCommand,
  whatsappStatusCompressionCommand,
} from "./ffmpegCommands";

export function getFileExtension(fileName: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1].toLowerCase();
  }
  return "";
}

function removeFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(0, lastDotIndex);
  }
  return fileName;
}

function validateVideoSettings(videoSettings: VideoInputSettings): void {
  if (videoSettings.customEndTime < videoSettings.customStartTime) {
    throw new Error("End time cannot be less than start time");
  }
  if (videoSettings.customStartTime < 0) {
    throw new Error("Start time cannot be negative");
  }
}

export default async function convertFile(
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: VideoInputSettings
): Promise<{ url: string; output: string; outputBlob: Blob }> {
  try {
    validateVideoSettings(videoSettings);
    
    const { file, fileName, fileType } = actionFile;
    const output = `${removeFileExtension(fileName)}_converted.${videoSettings.videoType}`;
    
    // Write input file
    await ffmpeg.writeFile(fileName, await fetchFile(file));
    
    // Get appropriate command
    const command = videoSettings.twitterCompressionCommand
      ? twitterCompressionCommand(fileName, output, videoSettings)
      : videoSettings.whatsappStatusCompressionCommand
      ? whatsappStatusCompressionCommand(fileName, output, videoSettings)
      : customVideoCompressionCommand(fileName, output, videoSettings);

    console.log("FFmpeg Command:", command.join(" "));
    
    // Execute conversion
    await ffmpeg.exec(command);
    
    // Read output file
    const data = await ffmpeg.readFile(output);
    if (!data) {
      throw new Error("Failed to read converted file");
    }
    
    // Create blob with correct mime type
    const mimeType = `video/${videoSettings.videoType}`;
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    return { url, output, outputBlob: blob };
  } catch (error) {
    console.error("Video conversion error:", error);
    throw error;
  }
}

export const formatTime = (seconds: number): string => {
  seconds = Math.max(0, Math.round(seconds));

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours}hr`);
  }
  if (minutes > 0 || hours > 0) {
    parts.push(`${minutes}min`);
  }
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}sec`);
  }

  return parts.join(" ");
};
