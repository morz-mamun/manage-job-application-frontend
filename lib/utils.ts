import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function timeAgo(date: string | Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`
  return formatDate(date)
}

export const statusConfig = {
  saved:     { label: 'Saved',      class: 'badge-saved',     dot: '#3B82F6' },
  applied:   { label: 'Applied',    class: 'badge-applied',   dot: '#8B5CF6' },
  interview: { label: 'Interview',  class: 'badge-interview', dot: '#F5A623' },
  offer:     { label: 'Offer',      class: 'badge-offer',     dot: '#10B981' },
  rejected:  { label: 'Rejected',   class: 'badge-rejected',  dot: '#EF4444' },
  withdrawn: { label: 'Withdrawn',  class: 'badge-withdrawn', dot: '#6B7280' },
} as const
