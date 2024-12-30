export const calculateTimeInHoursMinutesSeconds = (seconds: number): string => {
  // Handle invalid inputs
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return "00:00";
  }

  // Ensure non-negative value
  seconds = Math.max(0, Math.round(seconds));

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format with leading zeros
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  // Return appropriate format based on duration
  return hours > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};
