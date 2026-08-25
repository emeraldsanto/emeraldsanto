export function formatDate(value: string) {
  if (/^\d{4}$/.test(value)) return value;

  // Date-only strings parse as UTC midnight — pin the output to UTC so the
  // rendered day doesn't shift behind in negative-offset timezones.
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
