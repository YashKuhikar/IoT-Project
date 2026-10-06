/**
 * Format timestamp into readable local time string, e.g. "10:42:18 PM"
 */
export function formatLocalTime(isoOrDate) {
  if (!isoOrDate) return '--:--:--';
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '--:--:--';

  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Format timestamp into short time string for chart axis, e.g. "10:42:18"
 */
export function formatChartTime(isoOrDate) {
  if (!isoOrDate) return '';
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '';

  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/**
 * Format timestamp into date & time string, e.g. "06 Oct 2026, 10:42 PM"
 */
export function formatDateTime(isoOrDate) {
  if (!isoOrDate) return '--';
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '--';

  const datePart = d.toLocaleDateString([], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const timePart = d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart}, ${timePart}`;
}
