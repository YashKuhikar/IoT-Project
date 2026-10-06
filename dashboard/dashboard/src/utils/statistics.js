/**
 * Calculates statistical metrics (min, max, average) for a numerical key across readings.
 * @param {Array} readings Array of reading objects
 * @param {'temperature'|'humidity'} key Field key to calculate stats for
 * @returns {{ min: number | null, max: number | null, avg: number | null }}
 */
export function calculateStats(readings, key) {
  if (!Array.isArray(readings) || readings.length === 0) {
    return { min: null, max: null, avg: null };
  }

  const values = readings
    .map((r) => r[key])
    .filter((v) => typeof v === 'number' && !Number.isNaN(v));

  if (values.length === 0) {
    return { min: null, max: null, avg: null };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;

  return {
    min: Number(min.toFixed(1)),
    max: Number(max.toFixed(1)),
    avg: Number(avg.toFixed(1)),
  };
}

/**
 * Returns weather comfort/status classification based on temperature and humidity
 */
export function getReadingStatus(temperature, humidity) {
  if (temperature > 35) {
    return { label: 'High Temp', type: 'warning' };
  }
  if (temperature < 15) {
    return { label: 'Low Temp', type: 'info' };
  }
  if (humidity > 70) {
    return { label: 'High Humidity', type: 'warning' };
  }
  if (humidity < 30) {
    return { label: 'Dry', type: 'info' };
  }
  return { label: 'Optimal', type: 'success' };
}
