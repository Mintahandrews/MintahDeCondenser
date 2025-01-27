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

  const handleVideoMetadata = useCallback(
    (video: HTMLVideoElement) => {
      const durationInSeconds = Math.floor(video.duration);
      if (isNaN(durationInSeconds) || durationInSeconds <= 0) return;

      setVideoEndTime(durationInSeconds);

      if (isInitialMount.current) {
        isInitialMount.current = false;
        onVideoSettingsChange({
          ...videoSettings,
          customEndTime: durationInSeconds,
          customStartTime: 0,
        });
      }
    },
    [videoSettings, onVideoSettingsChange]
  );

  useEffect(() => {
    const video = document.getElementById(
      "condense-video-player"
    ) as HTMLVideoElement;
    if (!video) return;

    videoRef.current = video;

    const handleLoadedMetadata = () => {
      if (video.readyState >= 1) {
        handleVideoMetadata(video);
      }
    };

    handleLoadedMetadata(); // Initial check
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleLoadedMetadata);
    };
  }, [handleVideoMetadata]);

  const handleTrimChange = useCallback(
    (start: number, end: number) => {
      // Ensure values are within valid range
      const validStart = Math.max(0, Math.min(start, videoEndTime));
      const validEnd = Math.max(validStart, Math.min(end, videoEndTime));

      // Only update if values are valid and different from current
      if (
        validStart >= 0 &&
        validEnd <= videoEndTime &&
        validStart < validEnd &&
        (validStart !== videoSettings.customStartTime ||
          validEnd !== videoSettings.customEndTime)
      ) {
        onVideoSettingsChange({
          ...videoSettings,
          customEndTime: validEnd,
          customStartTime: validStart,
        });

        // Update video current time when trim changes
        if (videoRef.current) {
          videoRef.current.currentTime = validStart;
        }
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
            <p className="font-medium">
              {calculateTimeInHoursMinutesSeconds(
                videoSettings.customStartTime
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-500">End Time</p>
            <p className="font-medium">
              {calculateTimeInHoursMinutesSeconds(videoSettings.customEndTime)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
