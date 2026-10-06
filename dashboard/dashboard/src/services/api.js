const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Validates and sanitizes a single reading object from backend
 */
export function sanitizeReading(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const tempNum = Number(raw.temperature);
  const humNum = Number(raw.humidity);

  if (Number.isNaN(tempNum) || Number.isNaN(humNum)) {
    return null;
  }

  // Parse and validate timestamp
  let parsedDate = raw.timestamp ? new Date(raw.timestamp) : new Date();
  if (Number.isNaN(parsedDate.getTime())) {
    parsedDate = new Date();
  }

  return {
    _id: raw._id || String(Math.random()),
    temperature: tempNum,
    humidity: humNum,
    timestamp: parsedDate.toISOString(),
    dateObj: parsedDate,
  };
}

/**
 * Fetches recent readings from the backend
 * @param {AbortSignal} [signal] Optional abort signal
 * @returns {Promise<Array>} Array of validated reading objects in chronological order
 */
export async function getReadings(signal) {
  const response = await fetch(`${API_BASE_URL}/api/readings`, {
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch readings: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(sanitizeReading)
    .filter((item) => item !== null);
}

export { API_BASE_URL };
