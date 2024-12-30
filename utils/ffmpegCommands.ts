import { getFileExtension } from "./convert";
import { VideoFormats, VideoInputSettings } from "./types";

export const whatsappStatusCompressionCommand = (
  input: string,
  output: string,
  videoSettings?: VideoInputSettings
) => {
  const audioOptions = videoSettings?.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "64k"];
  const trimOptions = videoSettings?.customStartTime || videoSettings?.customEndTime ? [
    "-ss",
    videoSettings.customStartTime.toString(),
    "-t",
    (videoSettings.customEndTime - videoSettings.customStartTime).toString(),
  ] : [];
  
  return [
    "-i",
    input,
    ...trimOptions,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",  // Faster encoding
    "-crf",
    "28",
    "-tune",
    "fastdecode",  // Optimize for fast decoding
    ...audioOptions,
    "-movflags",
    "+faststart",
    "-maxrate",
    "1500k",
    "-bufsize",
    "2000k",
    "-fs",
    "16M",
    "-vf",
    "scale='min(1280,iw)':'-2':flags=fast_bilinear",  // Faster scaling
    "-threads",
    "0",  // Use all available CPU threads
    output,
  ];
};

export const twitterCompressionCommand = (
  input: string,
  output: string,
  videoSettings?: VideoInputSettings
) => {
  const audioOptions = videoSettings?.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];
  const trimOptions = videoSettings?.customStartTime || videoSettings?.customEndTime ? [
    "-ss",
    videoSettings.customStartTime.toString(),
    "-t",
    (videoSettings.customEndTime - videoSettings.customStartTime).toString(),
  ] : [];

  return [
    "-i",
    input,
    ...trimOptions,
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "30",
    ...audioOptions,
    "-movflags",
    "+faststart",
    "-maxrate",
    "5000k",
    "-bufsize",
    "5000k",
    "-threads",
    "0",
    "-vf",
    "scale='min(1920,iw)':'-2':flags=fast_bilinear",
    output,
  ];
};

export const customVideoCompressionCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
): string[] => {
  // Apply trim options at the input stage for better performance
  const trimOptions = videoSettings.customStartTime || videoSettings.customEndTime ? [
    "-ss",
    videoSettings.customStartTime.toString(),
    "-t",
    (videoSettings.customEndTime - videoSettings.customStartTime).toString(),
  ] : [];

  const baseCommand = [
    "-i",
    input,
    "-threads",
    "0",  // Use all available CPU threads
  ];
  
  // Handle audio removal if specified
  if (videoSettings.removeAudio) {
    baseCommand.push("-an");
  }

  const inputType = getFileExtension(input);
  if (inputType === "mp4" && videoSettings.videoType === VideoFormats.MP4) {
    // Special case for MP4 to MP4 conversion - use copy codec when possible
    return [...baseCommand, ...getMP4toMP4Command(input, output, videoSettings)];
  } else {
    switch (videoSettings.videoType) {
      case VideoFormats.MP4:
        return [...baseCommand, ...getMP4Command(input, output, videoSettings)];
      case VideoFormats.AVI:
        return [...baseCommand, ...getAVICommand(input, output, videoSettings)];
      case VideoFormats.MKV:
        return [...baseCommand, ...getMKVCommand(input, output, videoSettings)];
      case VideoFormats.MOV:
        return [...baseCommand, ...getMOVCommand(input, output, videoSettings)];
      default:
        return [...baseCommand, output];
    }
  }
};

const getMP4toMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "copy"];
  
  return [
    "-c:v",
    "copy",  // Use stream copy for fastest possible conversion
    ...audioOptions,
    "-movflags",
    "+faststart",
    output,
  ];
};

const getMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];

  return [
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-profile:v",
    "high",
    "-level:v",
    "4.1",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    videoSettings.quality,
    "-maxrate",
    "4000k",
    "-bufsize",
    "4000k",
    "-vf",
    "scale='min(1920,iw)':'-2':flags=fast_bilinear",
    "-movflags",
    "+faststart",
    ...audioOptions,
    output,
  ];
};

const getMOVCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];

  return [
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-crf",
    videoSettings.quality,
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale='min(1920,iw)':'-2':flags=fast_bilinear",
    "-movflags",
    "+faststart",
    ...audioOptions,
    output,
  ];
};

const getMKVCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];

  return [
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-crf",
    videoSettings.quality,
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale='min(1920,iw)':'-2':flags=fast_bilinear",
    ...audioOptions,
    output,
  ];
};

const getAVICommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];

  return [
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-crf",
    videoSettings.quality,
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale='min(1920,iw)':'-2':flags=fast_bilinear",
    ...audioOptions,
    output,
  ];
};
