export function formatClassTime(startTime: Date, endTime: Date): string {
  // Vietnamese day mapping
  const dayMap: Record<number, string> = {
    0: 'CN',  // Sunday
    1: 'T2',  // Monday
    2: 'T3',  // Tuesday
    3: 'T4',  // Wednesday
    4: 'T5',  // Thursday
    5: 'T6',  // Friday
    6: 'T7',  // Saturday
  };

  const day = dayMap[startTime.getDay()];
  const startHour = startTime.getHours();
  const startMin = startTime.getMinutes();
  const endHour = endTime.getHours();
  const endMin = endTime.getMinutes();

  const formatTime = (hour: number, min: number): string => {
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;
    const displayMin = min.toString().padStart(2, '0');
    return `${displayHour}:${displayMin}${period}`;
  };

  const startTimeStr = formatTime(startHour, startMin);
  const endTimeStr = formatTime(endHour, endMin);

  return `${day}, ${startTimeStr} - ${endTimeStr}`;
}

export function formatFullDateTime(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  
  return `${dayName}, ${displayHours}:${minutes}${period}`;
}