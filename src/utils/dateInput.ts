/**
 * Shared date helpers for questionnaire date inputs across native and web.
 */

/** Format a Date as YYYY-MM-DD for HTML date inputs. */
export function toInputDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parse YYYY-MM-DD into a local Date at noon to avoid timezone shifts. */
export function fromInputDateString(value: string): Date {
  return new Date(`${value}T12:00:00`);
}

/** Format a Date for display in questionnaire buttons and labels. */
export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString();
}
