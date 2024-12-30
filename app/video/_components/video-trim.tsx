import { VideoInputSettings } from "@/utils/types";
import { motion } from "framer-motion";
import { VideoSlider } from "../../../components/ui/video-slider";
import { useEffect, useState, useCallback, useRef } from "react";
import { calculateTimeInHoursMinutesSeconds } from "../../../utils/timeConverter";

type VideoTrimProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};

export const VideoTrim = ({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoTrimProps) => {
  const [videoEndTime, setVideoEndTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInitialMount = useRef(true);

  // Validate and format times
  const startTime = calculateTimeInHoursMinutesSeconds(
    Math.max(0, videoSettings.customStartTime)
  );
  const endTime = calculateTimeInHoursMinutesSeconds(
    Math.min(videoEndTime, videoSettings.customEndTime)
  );

  const handleVideoMetadata = useCallback(
    (video: HTMLVideoElement) => {
      const durationInSeconds = video.duration;
      if (isNaN(durationInSeconds) || durationInSeconds <= 0) return;

      setVideoEndTime(durationInSeconds);

      // Only update settings on initial mount or when duration changes significantly
      if (
        isInitialMount.current ||
        Math.abs(durationInSeconds - videoEndTime) > 1
      ) {
        isInitialMount.current = false;
        onVideoSettingsChange({
          ...videoSettings,
          customEndTime: durationInSeconds,
          customStartTime: 0,
        });
      }
    },
    [videoEndTime, videoSettings, onVideoSettingsChange]
  );

  useEffect(() => {
    const video = document.getElementById(
      "condense-video-player"
    ) as HTMLVideoElement;
    if (!video) return;

    videoRef.current = video;

    // Handle initial load
    if (video.readyState >= 1) {
      handleVideoMetadata(video);
    }

    // Setup event listeners
    const handleLoadedMetadata = () => handleVideoMetadata(video);
    const handleDurationChange = () => handleVideoMetadata(video);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, [handleVideoMetadata]);

  // Validate trim values only when user changes them
  const handleTrimChange = useCallback(
    (start: number, end: number) => {
      if (start >= 0 && end <= videoEndTime && start < end) {
        onVideoSettingsChange({
          ...videoSettings,
          customEndTime: end,
          customStartTime: start,
        });
      }
    },
    [videoEndTime, videoSettings, onVideoSettingsChange]
  );

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key={"trim"}
      transition={{ type: "tween" }}
      className="rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200"
    >
      <div className="text-sm">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Trim Video</p>
          <p className="text-gray-500 text-xs">
            Duration: {calculateTimeInHoursMinutesSeconds(videoEndTime)}
          </p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <VideoSlider
            disabled={disable || videoEndTime === 0}
            value={[
              Math.max(0, videoSettings.customStartTime),
              Math.min(videoEndTime, videoSettings.customEndTime),
            ]}
            max={videoEndTime}
            min={0}
            step={1}
            className="w-full"
            onValueChange={(value: number[]) => {
              const [start, end] = value;
              handleTrimChange(start, end);
            }}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500">Start Time</p>
            <p className="font-medium">{startTime}</p>
          </div>
          <div>
            <p className="text-gray-500">End Time</p>
            <p className="font-medium">{endTime}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
