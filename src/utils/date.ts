/**
 * Formats a date string into a human-readable long date format (e.g. "28 June 2025").
 *
 * This function uses the `Intl.DateTimeFormat` API with the `"en-GB"` locale to format
 * the date in the order of `day month year`, using the full month name.
 *
 * @param dateString - A string representing a valid date (ISO format recommended).
 * @returns A formatted date string in the format: `DD Month YYYY` (e.g., "28 June 2025").
 *
 * @example
 * formatDateToLong("2025-06-28T00:00:00.000Z"); // "28 June 2025"
 */
export function formatDateToLong(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}