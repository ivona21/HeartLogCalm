import { format, isToday, isYesterday } from 'date-fns';

export function getEmotionEntryDayLabel(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'MMMM d, yyyy');
}

export function getEmotionEntryTimeLabel(date: Date): string {
  return format(date, 'HH:mm');
}
