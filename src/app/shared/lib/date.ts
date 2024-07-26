export function formatDate(date: string): string {
  const inputDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;
  const secondsInYear = 31536000;

  if (diffInSeconds < secondsInMinute) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < secondsInHour)
    return `${Math.floor(diffInSeconds / secondsInMinute)} minutes ago`;
  if (diffInSeconds < secondsInDay)
    return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
  if (diffInSeconds < secondsInMonth)
    return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
  if (diffInSeconds < secondsInYear)
    return `${Math.floor(diffInSeconds / secondsInMonth)} months ago`;
  return `${Math.floor(diffInSeconds / secondsInYear)} years ago`;
}

export function formatDate2(date: string): string {
  const inputDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(inputDate);
}

export function getDiffHours(date: string): number {
  const inputDate = new Date(date);
  const now = new Date();
  const diffInMillis = now.getTime() - inputDate.getTime();
  return Math.floor(diffInMillis / (1000 * 60 * 60));
}
