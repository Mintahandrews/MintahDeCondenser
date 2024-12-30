import { spawn } from "child_process";

interface VideoProcessingOptions {
  removeAudio?: boolean;
  maxDuration?: number; // in seconds
  quality?: string; // 'high', 'medium', 'low'
  outputFormat?: string;
}

export class VideoProcessor {
  private static validateDuration(
    duration: number,
    maxAllowed: number
  ): boolean {
    return duration <= maxAllowed;
  }

  private static getQualitySettings(quality: string): string[] {
    const settings = {
      high: ["-crf", "18"],
      medium: ["-crf", "23"],
      low: ["-crf", "28"],
    };
    return settings[quality as keyof typeof settings] || settings.medium;
  }

  static async processVideo(
    inputPath: string,
    outputPath: string,
    options: VideoProcessingOptions
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ffmpegArgs = ["-i", inputPath];

      // Remove audio if specified
      if (options.removeAudio) {
        ffmpegArgs.push("-an");
      }

      // Add duration limit if specified
      if (options.maxDuration) {
        ffmpegArgs.push("-t", options.maxDuration.toString());
      }

      // Add quality settings
      if (options.quality) {
        ffmpegArgs.push(...this.getQualitySettings(options.quality));
      }

      // Add output format settings
      ffmpegArgs.push(
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-movflags",
        "+faststart",
        outputPath
      );

      const ffmpeg = spawn("ffmpeg", ffmpegArgs);

      ffmpeg.stderr.on("data", (data) => {
        console.log(`ffmpeg: ${data}`);
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          reject(new Error(`FFmpeg process exited with code ${code}`));
        }
      });

      ffmpeg.on("error", (err) => {
        reject(err);
      });
    });
  }

  static async optimizeForTwitter(
    inputPath: string,
    outputPath: string,
    quality: string = "high"
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      removeAudio: false,
      maxDuration: 140, // 2:20 in seconds
      quality,
      outputFormat: "mp4",
    });
  }

  static async optimizeForWhatsAppStatus(
    inputPath: string,
    outputPath: string,
    quality: string = "high"
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      removeAudio: false,
      maxDuration: 30,
      quality,
      outputFormat: "mp4",
    });
  }

  static async removeAudioTrack(
    inputPath: string,
    outputPath: string,
    quality: string = "high"
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      removeAudio: true,
      quality,
      outputFormat: "mp4",
    });
  }
}
