export function getNextOccurrence(
  originalDate: Date,
  recurring: boolean
): Date {
  if (!recurring) return originalDate;

  const now = new Date();
  const originalDayOfWeek = originalDate.getDay();
  const originalHours = originalDate.getHours();
  const originalMinutes = originalDate.getMinutes();

  // Start from today
  let nextDate = new Date(now);
  nextDate.setHours(originalHours, originalMinutes, 0, 0);

  // Find the next occurrence of the same day of week
  const currentDayOfWeek = now.getDay();
  let daysToAdd = originalDayOfWeek - currentDayOfWeek;

  if (daysToAdd < 0 || (daysToAdd === 0 && now > nextDate)) {
    daysToAdd += 7;
  }

  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return nextDate;
}

export function calculateRecurringEndDateTime(
  startDateTime: Date,
  endDateTime: Date | null,
  recurring: boolean
): Date | null {
  if (!endDateTime || !recurring) return endDateTime;

  const duration = endDateTime.getTime() - startDateTime.getTime();
  const nextStart = getNextOccurrence(startDateTime, recurring);
  
  return new Date(nextStart.getTime() + duration);
}