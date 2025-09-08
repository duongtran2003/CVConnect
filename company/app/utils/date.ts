import moment from "moment-timezone";

/**
 * Convert either an epoch (seconds) or a time string into a formatted string.
 *
 * @param input - Epoch in seconds OR a date string
 * @param format - Desired output format (e.g. "YYYY-MM-DD HH:mm:ss")
 * @param timezone - Optional IANA timezone string (e.g. "Asia/Tokyo")
 * @returns Formatted date string
 */
export function formatDateTime(
  input: number | string,
  format: string,
  timezone?: string,
): string {
  let m: moment.Moment;

  if (typeof input === "number") {
    m = moment.unix(input);
  } else {
    m = moment(input);
  }

  if (timezone) {
    m = m.tz(timezone);
  }

  return m.format(format);
}
