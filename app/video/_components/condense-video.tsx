"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CustomDropZone } from "./custom-dropzone";
import { acceptedVideoFiles } from "@/utils/formats";
import { useEffect, useRef, useState } from "react";
import {
  FileActions,
  QualityType,
  VideoFormats,
  VideoInputSettings,
} from "@/utils/types";
import { VideoDisplay } from "./video-display";
import { VideoInputDetails } from "./video-input-details";
import { VideoTrim } from "./video-trim";
import { VideoInputControl } from "./video-input-control";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import convertFile from "@/utils/convert";
import { VideoCondenseProgress } from "./video-condense-progress";
import { VideoOutputDetails } from "./video-output-details";

const CondenseVideo = () => {
  const [videoFile, setVideoFile] = useState<FileActions>();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: Date;
    elapsedSeconds?: number;
  }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<
    "notStarted" | "loading" | "ready" | "condensing" | "converted" | "error"
  >("notStarted");
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.High,
    videoType: VideoFormats.MP4,
    removeAudio: false,
    twitterCompressionCommand: false,
    whatsappStatusCompressionCommand: false,
    customStartTime: 0,
    customEndTime: 0,
  });

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoFile?.file) {
      const url = URL.createObjectURL(videoFile.file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile?.file]);

  const handleUpload = (file: File) => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      if (!file.type.startsWith("video/")) {
        throw new Error("Selected file is not a video");
      }

      setVideoFile({
        fileName: file.name,
        fileSize: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase(),
        fileType: file.type,
        file,
        isError: false,
      });
      setStatus("ready");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Error uploading file");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time?.startTime && status === "condensing") {
      timer = setInterval(() => {
        const endTime = new Date();
        const timeDifference = Math.max(0, endTime.getTime() - time.startTime!.getTime());
        setTime({ ...time, elapsedSeconds: timeDifference });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [time, status]);

  const ffmpegRef = useRef(new FFmpeg());
  const disableDuringCompression = status === "condensing" || status === "loading";

  const load = async () => {
    try {
      setStatus("loading");
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.load({
        coreURL: await toBlobURL(
          "/download/ffmpeg-core.js",
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          "/download/ffmpeg-core.wasm",
          "application/wasm"
        ),
      });
      setStatus("ready");
    } catch (error) {
      console.error("FFmpeg load error:", error);
      setStatus("error");
      throw error;
    }
  };

  const loadWithToast = () => {
    toast.promise(load, {
      loading: "Loading video processing capabilities...",
      success: "Ready to process videos",
      error: "Failed to load video processor. Please refresh the page.",
    });
  };

  useEffect(() => {
    loadWithToast();
    return () => {
      // Cleanup FFmpeg instance and object URLs when component unmounts
      if (videoFile?.url) {
        URL.revokeObjectURL(videoFile.url);
      }
      if (videoFile?.output?.url) {
        URL.revokeObjectURL(videoFile.output.url);
      }
      if (ffmpegRef.current) {
        ffmpegRef.current.terminate();
      }
    };
  }, []);

  const condense = async () => {
    if (!videoFile) {
      toast.error("Please upload a video first");
      return;
    }

    try {
      // Reset any previous state
      if (videoFile.output?.url) {
        URL.revokeObjectURL(videoFile.output.url);
      }
      
      setTime({ startTime: new Date(), elapsedSeconds: 0 });
      setStatus("condensing");
      setProgress(0);

      // Set up progress tracking
      ffmpegRef.current.on("progress", ({ progress: completion }) => {
        const percentage = Math.min(Math.round(completion * 100), 100);
        setProgress(percentage);
      });

      ffmpegRef.current.on("log", ({ message }) => {
        console.log("FFmpeg:", message);
      });

      // Convert the video
      const { url, output, outputBlob } = await convertFile(
        ffmpegRef.current,
        videoFile,
        videoSettings
      );

      setVideoFile({
        ...videoFile,
        url,
        output,
        outputBlob,
      });

      setStatus("converted");
      toast.success("Video processed successfully!");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
      toast.error(error instanceof Error ? error.message : "Error processing video");
      
      // Reset FFmpeg instance on error
      try {
        ffmpegRef.current.terminate();
        ffmpegRef.current = new FFmpeg();
        await loadWithToast();
      } catch (resetError) {
        console.error("Failed to reset FFmpeg:", resetError);
      }
    } finally {
      setTime((oldTime) => ({ ...oldTime, startTime: undefined }));
      setProgress(0);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        key={"drag"}
        transition={{ type: "tween" }}
        className="border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35"
      >
        {videoFile ? (
          <VideoDisplay videoUrl={videoUrl} />
        ) : (
          <CustomDropZone
            handleUpload={handleUpload}
            acceptedFiles={acceptedVideoFiles}
          />
        )}
      </motion.div>
      <AnimatePresence mode="popLayout">
        <motion.div className="border rounded-3xl col-span-3 flex w-full md:h-full bg-gray-50/35 p-4 relative">
          <div className="flex flex-col gap-4 w-full">
            {videoFile && (
              <>
                <VideoInputDetails
                  videoFile={videoFile}
                  onClear={() => window.location.reload()}
                />
                <VideoTrim
                  disable={disableDuringCompression}
                  onVideoSettingsChange={setVideoSettings}
                  videoSettings={videoSettings}
                />
              </>
            )}
            <VideoInputControl
              disable={disableDuringCompression}
              onVideoSettingsChange={setVideoSettings}
              videoSettings={videoSettings}
            />

            <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={"button"}
              transition={{ type: "tween" }}
              className="bg-gray-100 border-gray-200 rounded-2xl p-3 h-fit"
            >
              {status === "condensing" && (
                <VideoCondenseProgress
                  progress={progress}
                  seconds={time.elapsedSeconds!}
                />
              )}

              {(status === "notStarted" || status === "converted" || status === "ready") && (
                <button
                  onClick={condense}
                  type="button"
                  className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 relative px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 flex-shrink-0"
                >
                  Condense
                </button>
              )}
            </motion.div>
            {status === "converted" && videoFile && (
              <VideoOutputDetails
                timeTaken={time.elapsedSeconds}
                videoFile={videoFile!}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CondenseVideo;
