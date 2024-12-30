export type FileActions = {
  file: File;
  fileName: string;
  fileSize: number;
  from: string;
  fileType: string;
  isError?: boolean;
  url?: string;
  output?: any;
  outputBlob?: Blob;
};

export enum VideoFormats {
  MP4 = "mp4",
  MOV = "mov",
  MKV = "mkv",
  AVI = "avi",
  WEBM = "webm",
  M4V = "m4v",
  THREEGP = "3gp",
  WMV = "wmv"
}

export enum QualityType {
  High = "high",
  Medium = "medium",
  Low = "low"
}

export interface VideoInputSettings {
  removeAudio: boolean;
  quality: QualityType;
  videoType: VideoFormats;
  twitterCompressionCommand: boolean;
  whatsappStatusCompressionCommand: boolean;
  customStartTime: number;
  customEndTime: number;
}

export interface ProcessingError {
  code: string;
  message: string;
  details?: string;
}

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  format: string;
  size: number;
  bitrate?: number;
}

export interface ProcessingProgress {
  percent: number;
  timeRemaining?: number;
  currentFile?: string;
}
