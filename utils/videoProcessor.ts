import { spawn } from "child_process";
import { existsSync } from "fs";

interface VideoProcessingOptions {
  removeAudio?: boolean;
  maxDuration?: number;
  quality?: "high" | "medium" | "low";
  outputFormat?: string;
  videoBitrate?: string;
  scale?: string;
  startTime?: string | number;
  endTime?: string | number;
}

export class VideoProcessor {
  private static validateDuration(
    duration: number,
    maxAllowed: number
  ): boolean {
    return duration > 0 && duration <= maxAllowed;
  }

  private static getQualitySettings(
    quality: VideoProcessingOptions["quality"]
  ): string[] {
    const settings = {
      high: ["-crf", "18", "-preset", "slow"],
      medium: ["-crf", "23", "-preset", "medium"],
      low: ["-crf", "28", "-preset", "fast"],
    };
    return settings[quality || "medium"];
  }

  private static getBitrateSettings(
    quality: VideoProcessingOptions["quality"]
  ): string {
    const settings = {
      high: "2M",
      medium: "1M",
      low: "500k",
    };
    return settings[quality || "medium"];
  }

  private static validateInputPath(inputPath: string): void {
    if (!inputPath) {
      throw new Error("Input file path is required");
    }
    if (!existsSync(inputPath)) {
      throw new Error(`Input file does not exist: ${inputPath}`);
    }
    if (!inputPath.toLowerCase().match(/\.(mp4|mov|avi|mkv|webm)$/)) {
      throw new Error(
        "Unsupported video format. Please use MP4, MOV, AVI, MKV, or WEBM"
      );
    }
  }

  private static validateOutputPath(outputPath: string): void {
    if (!outputPath) {
      throw new Error("Output file path is required");
    }
    if (!outputPath.toLowerCase().endsWith(".mp4")) {
      throw new Error("Output file must be MP4 format");
    }
  }

  private static validateTimeFormat(time: string | number): string {
    if (typeof time === "number") {
      // Convert seconds to HH:MM:SS format
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else if (typeof time === "string") {
      // Validate HH:MM:SS format
      const timeRegex = /^(?:\d+:)?(?:[0-5]\d:)?(?:[0-5]\d)(?:\.\d+)?$/;
      if (!timeRegex.test(time)) {
        throw new Error(
          'Invalid time format. Use HH:MM:SS, MM:SS, or SS format (e.g., "01:30:00", "90:00", or "5400")'
        );
      }
      return time;
    }
    throw new Error("Invalid time format");
  }

  static async processVideo(
    inputPath: string,
    outputPath: string,
    options: VideoProcessingOptions
  ): Promise<boolean> {
    try {
      this.validateInputPath(inputPath);
      this.validateOutputPath(outputPath);

      return new Promise((resolve, reject) => {
        const ffmpegArgs = ["-i", inputPath];

        // Add trim settings if specified
        if (options.startTime !== undefined) {
          const startTime = this.validateTimeFormat(options.startTime);
          ffmpegArgs.push("-ss", startTime);
        }

        if (options.endTime !== undefined) {
          const endTime = this.validateTimeFormat(options.endTime);
          ffmpegArgs.push("-to", endTime);
        }

        // Remove audio if specified
        if (options.removeAudio) {
          ffmpegArgs.push("-an");
        } else {
          // If keeping audio, ensure good quality
          ffmpegArgs.push("-c:a", "aac", "-b:a", "128k");
        }

        // Add duration limit if specified
        if (options.maxDuration) {
          if (!this.validateDuration(options.maxDuration, 600)) {
            // Max 10 minutes
            throw new Error(
              "Invalid duration. Must be between 1 and 600 seconds"
            );
          }
          ffmpegArgs.push("-t", options.maxDuration.toString());
        }

        // Add quality settings
        if (options.quality) {
          ffmpegArgs.push(...this.getQualitySettings(options.quality));
        }

        // Add bitrate control
        const bitrate = options.videoBitrate || this.getBitrateSettings(options.quality);
        ffmpegArgs.push(
          "-b:v",
          bitrate,
          "-maxrate",
          bitrate,
          "-bufsize",
          bitrate
        );

        // Scale video if needed
        if (options.scale) {
          ffmpegArgs.push("-vf", `scale=${options.scale}`);
        }

        // Add output format settings
        ffmpegArgs.push(
          "-c:v",
          "libx264",
          "-movflags",
          "+faststart",
          "-pix_fmt",
          "yuv420p",
          "-y", // Overwrite output file if exists
          outputPath
        );

        const ffmpeg = spawn("ffmpeg", ffmpegArgs);
        let errorOutput = "";

        ffmpeg.stderr.on("data", (data) => {
          const message = data.toString();
          errorOutput += message;

          // Only log important messages
          if (message.includes("Error") || message.includes("Warning")) {
            console.error(`FFmpeg: ${message}`);
          }
        });

        ffmpeg.stdout.on("data", (data) => {
          console.log(`FFmpeg output: ${data}`);
        });

        ffmpeg.on("close", (code) => {
          if (code === 0) {
            resolve(true);
          } else {
            reject(
              new Error(
                `FFmpeg process failed with code ${code}. Error: ${errorOutput}`
              )
            );
          }
        });

        ffmpeg.on("error", (err) => {
          reject(
            new Error(`FFmpeg process error: ${err.message}\n${errorOutput}`)
          );
        });
      });
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  static async trimVideo(
    inputPath: string,
    outputPath: string,
    startTime: string | number,
    endTime: string | number,
    quality: VideoProcessingOptions["quality"] = "high"
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      startTime,
      endTime,
      quality,
      outputFormat: "mp4",
      videoBitrate: "2M", // Maintain high quality for trimmed video
    });
  }

  static async optimizeForTwitter(
    inputPath: string,
    outputPath: string,
    quality: VideoProcessingOptions["quality"] = "high"
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      removeAudio: false,
      maxDuration: 140, // 2:20 in seconds
      quality,
      outputFormat: "mp4",
      scale: "1280:720", // Twitter recommended resolution
      videoBitrate: "2M", // Higher quality for Twitter
    });
  }

  static async optimizeForWhatsAppStatus(
    inputPath: string,
    outputPath: string,
    quality: VideoProcessingOptions["quality"] = "high"
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      removeAudio: false,
      maxDuration: 30, // Fixed back to 30 seconds for WhatsApp Status
      quality,
      outputFormat: "mp4",
      scale: "1080:1920", // Portrait orientation for mobile
      videoBitrate: "1.5M", // Good quality for mobile
    });
  }

  static async removeAudioTrack(
    inputPath: string,
    outputPath: string,
    quality: VideoProcessingOptions["quality"] = "high",
    preserveVideoQuality: boolean = true
  ): Promise<boolean> {
    return this.processVideo(inputPath, outputPath, {
      removeAudio: true,
      quality: preserveVideoQuality ? "high" : quality, // Ensure high quality when preserving video
      outputFormat: "mp4",
      videoBitrate: preserveVideoQuality ? "2M" : undefined, // Maintain high bitrate if preserving quality
    });
  }
}
