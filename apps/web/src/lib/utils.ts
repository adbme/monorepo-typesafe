import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReviewStatus(nextReview: string | number | Date) {
  const nextReviewDate = new Date(nextReview).getTime();
  const now = Date.now();
  
  const diff = nextReviewDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diff <= 0) return { label: "À réviser !", color: "text-red-400", bg: "bg-red-800/40", urgent: true };
  if (days === 1) return { label: "Demain", color: "text-orange-400", bg: "bg-orange-800/40", urgent: false };
  return { label: `Dans ${days} jours`, color: "text-blue-400", bg: "bg-blue-800/40", urgent: false };
}
