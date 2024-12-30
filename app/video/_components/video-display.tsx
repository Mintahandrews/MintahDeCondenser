import { useState } from 'react';

type VideoDisplayProps = {
  videoUrl: string | null;
};

export const VideoDisplay = ({ videoUrl }: VideoDisplayProps) => {
  const [error, setError] = useState(false);

  // Get video type from URL
  const getVideoType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'mov':
        return 'video/quicktime';
      case 'avi':
        return 'video/x-msvideo';
      case 'mkv':
        return 'video/x-matroska';
      default:
        return 'video/mp4';
    }
  };

  if (!videoUrl) {
    return (
      <div className="relative h-full w-full flex items-center justify-center bg-gray-100/90 rounded-3xl">
        <p className="text-gray-500 text-sm">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <video
        id="condense-video-player"
        controls
        className="h-full w-full rounded-3xl object-contain"
        onError={() => setError(true)}
        onCanPlay={() => setError(false)}
        key={videoUrl} // Force reload when URL changes
      >
        <source src={videoUrl} type={getVideoType(videoUrl)} />
        Your browser does not support the video tag.
      </video>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 rounded-3xl">
          <p className="text-gray-500 text-sm">
            Error loading video. Please try a different format.
          </p>
        </div>
      )}
    </div>
  );
};
