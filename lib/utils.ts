import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  // return a random 10 character string of numbers and letters. Eg. sJ41k23sO9
  return Math.random().toString(36).substring(2, 15)
}