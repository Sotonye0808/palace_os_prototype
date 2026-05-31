import { format, parseISO, isValid, startOfDay, endOfDay, addHours, differenceInHours } from 'date-fns';

/**
 * Utility functions for handling date and time operations
 */

/**
 * Checks if a date string is valid
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Formats a date to local time string
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

/**
 * Formats a date to display only time
 */
export const formatTimeOnly = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};

/**
 * Formats a date to display only date
 */
export const formatDateOnly = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

/**
 * Gets the start of day for a given date
 */
export const getStartOfDay = (dateString: string): string => {
  const date = new Date(dateString);
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start.toISOString();
};

/**
 * Gets the end of day for a given date
 */
export const getEndOfDay = (dateString: string): string => {
  const date = new Date(dateString);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end.toISOString();
};

/**
 * Adds hours to a date
 */
export const addHoursToDate = (dateString: string, hours: number): string => {
  const date = new Date(dateString);
  const result = new Date(date.getTime() + hours * 60 * 60 * 1000);
  return result.toISOString();
};

/**
 * Calculates difference in hours between two dates
 */
export const differenceInHoursBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return (end - start) / (60 * 60 * 1000);
};

/**
 * Gets current date in ISO format
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

/**
 * Checks if a scheduled time is in the future
 */
export const isScheduledTimeInFuture = (scheduledTime: string): boolean => {
  const scheduled = new Date(scheduledTime);
  const now = new Date();
  return scheduled > now;
};

/**
 * Gets minimum allowed scheduling time (e.g., 30 minutes from now)
 */
export const getMinScheduledTime = (): string => {
  const now = new Date();
  const minTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
  return minTime.toISOString();
};

/**
 * Gets maximum allowed scheduling time (e.g., 7 days from now)
 */
export const getMaxScheduledTime = (): string => {
  const now = new Date();
  const maxTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  return maxTime.toISOString();
};