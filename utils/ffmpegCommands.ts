import { getFileExtension } from "./convert";
import { VideoFormats, VideoInputSettings } from "./types";

export const whatsappStatusCompressionCommand = (
  input: string,
  output: string,
  videoSettings?: VideoInputSettings
) => {
  const audioOptions = videoSettings?.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "64k"];
  const trimOptions =
    videoSettings?.customStartTime || videoSettings?.customEndTime
      ? [
          "-ss",
          videoSettings.customStartTime.toFixed(3),
          "-t",
          (videoSettings.customEndTime - videoSettings.customStartTime).toFixed(
            3
          ),
        ]
      : [];

  return [
    ...(trimOptions.length ? trimOptions : []),
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "28",
    "-tune",
    "fastdecode",
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
    "scale='min(1280,iw)':'-2':flags=fast_bilinear",
    "-threads",
    "0",
    output,
  ];
};

export const twitterCompressionCommand = (
  input: string,
  output: string,
  videoSettings?: VideoInputSettings
) => {
  const audioOptions = videoSettings?.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "128k"];
  const trimOptions =
    videoSettings?.customStartTime || videoSettings?.customEndTime
      ? [
          "-ss",
          videoSettings.customStartTime.toFixed(3),
          "-t",
          (videoSettings.customEndTime - videoSettings.customStartTime).toFixed(
            3
          ),
        ]
      : [];

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
) => {
  const trimOptions =
    videoSettings.customStartTime > 0 || videoSettings.customEndTime > 0
      ? [
          "-ss",
          videoSettings.customStartTime.toFixed(3),
          "-t",
          (videoSettings.customEndTime - videoSettings.customStartTime).toFixed(
            3
          ),
        ]
      : [];

  const audioOptions = videoSettings.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "128k"];

  const qualityPreset = {
    high: ["-crf", "18", "-preset", "slow"],
    medium: ["-crf", "23", "-preset", "medium"],
    low: ["-crf", "28", "-preset", "fast"],
  }[videoSettings.quality] || ["-crf", "23", "-preset", "medium"];

  return [
    "-i",
    input,
    ...trimOptions,
    "-c:v",
    "libx264",
    ...qualityPreset,
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    ...audioOptions,
    "-y",
    output,
  ];
};

const getMP4toMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "copy"];

  return [
    "-c:v",
    "copy", // Use stream copy for fastest possible conversion
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
  const audioOptions = videoSettings.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "128k"];

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
  const audioOptions = videoSettings.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "128k"];

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
  const audioOptions = videoSettings.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "128k"];

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
  const audioOptions = videoSettings.removeAudio
    ? ["-an"]
    : ["-c:a", "aac", "-b:a", "128k"];

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
