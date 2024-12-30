import React from "react";
import {
  QualityType,
  VideoFormats,
  VideoInputSettings,
} from "../../../utils/types";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VideoInputControlProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};

export const VideoInputControl = ({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoInputControlProps) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    key={"drag"}
    transition={{ type: "tween" }}
    className="rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200"
  >
    <div className="text-sm space-y-2">
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <p>Remove Audio</p>
          <p className="text-xs text-gray-500">Remove audio track to reduce file size</p>
        </div>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({ ...videoSettings, removeAudio: value })
          }
          checked={videoSettings.removeAudio}
        />
      </div>

      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <p>Optimize for Twitter</p>
          <p className="text-xs text-gray-500">Max 2:20 minutes</p>
        </div>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              twitterCompressionCommand: value,
              whatsappStatusCompressionCommand: false,
            })
          }
          checked={videoSettings.twitterCompressionCommand}
        />
      </div>

      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <p>Optimize for WhatsApp Status</p>
          <p className="text-xs text-gray-500">Max 30 seconds</p>
        </div>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              whatsappStatusCompressionCommand: value,
              twitterCompressionCommand: false,
            })
          }
          checked={videoSettings.whatsappStatusCompressionCommand}
        />
      </div>

      {!videoSettings.twitterCompressionCommand &&
        !videoSettings.whatsappStatusCompressionCommand && (
          <>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <p>Quality</p>
                <p className="text-xs text-gray-500">Select output quality</p>
              </div>
              <Select
                disabled={disable}
                value={videoSettings.quality}
                onValueChange={(value: string) => {
                  const quality = value as QualityType;
                  onVideoSettingsChange({ ...videoSettings, quality });
                }}
              >
                <SelectTrigger className="w-[100px] text-sm">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  {quality.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <p>Format</p>
                <p className="text-xs text-gray-500">Select output format</p>
              </div>
              <Select
                disabled={disable}
                value={videoSettings.videoType}
                onValueChange={(value: string) => {
                  const videoType = value as VideoFormats;
                  onVideoSettingsChange({ ...videoSettings, videoType });
                }}
              >
                <SelectTrigger className="w-[150px] text-sm">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  {format.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
    </div>
  </motion.div>
);

const quality: { label: string; value: QualityType }[] = [
  { label: "High", value: QualityType.High },
  { label: "Medium", value: QualityType.Medium },
  { label: "Low", value: QualityType.Low },
];

const format: { label: string; value: VideoFormats }[] = [
  { label: "MP4", value: VideoFormats.MP4 },
  { label: "MOV", value: VideoFormats.MOV },
  { label: "MKV", value: VideoFormats.MKV },
  { label: "AVI", value: VideoFormats.AVI },
  { label: "WebM", value: VideoFormats.WEBM },
  { label: "M4V", value: VideoFormats.M4V },
  { label: "3GP", value: VideoFormats.THREEGP },
  { label: "WMV", value: VideoFormats.WMV },
];
