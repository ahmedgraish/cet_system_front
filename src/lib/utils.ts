import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format as formatDate } from 'date-fns';
import { ar } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateInArabic(date: Date, formatStr: string = 'EEEE, d MMMM yyyy'): string {
  return formatDate(date, formatStr, { locale: ar });
}