import { useMemo } from 'react';
import { History } from 'lucide-react';
import { formatLocalTime, formatDateTime } from '../utils/formatters';
import { getReadingStatus } from '../utils/statistics';

export default function RecentReadings({ readings = [] }) {
  // Newest readings first
  const reversedReadings = useMemo(() => {
    return [...readings].reverse();
  }, [readings]);

  // Take the most recent 15 entries for display
  const displayItems = useMemo(() => {
    return reversedReadings.slice(0, 15);
  }, [reversedReadings]);

  if (!readings || readings.length === 0) {
    return null;
  }

  return (
    <div className="recent-readings-card">
      <div className="recent-readings-header">
        <div className="table-title-group">
          <div className="table-icon-badge">
            <History size={16} />
          </div>
          <div>
            <h3 className="table-title">Recent Readings</h3>
            <span className="table-caption">
              Latest {displayItems.length} of {readings.length} sensor logs
            </span>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="table-wrapper">
        <table className="readings-table">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Temperature</th>
              <th scope="col">Humidity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((reading, index) => {
              const status = getReadingStatus(reading.temperature, reading.humidity);
              return (
                <tr key={reading._id || index} className="table-row">
                  <td className="cell-time">
                    <span className="cell-time-primary">
                      {formatLocalTime(reading.timestamp)}
                    </span>
                    <span className="cell-time-secondary">
                      {formatDateTime(reading.timestamp)}
                    </span>
                  </td>
                  <td className="cell-temp">
                    <span className="temp-numeric">
                      {Number(reading.temperature).toFixed(1)} °C
                    </span>
                  </td>
                  <td className="cell-hum">
                    <span className="hum-numeric">
                      {Number(reading.humidity).toFixed(1)} %
                    </span>
                  </td>
                  <td className="cell-status">
                    <span className={`status-pill-badge badge-${status.type}`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="mobile-cards-list">
        {displayItems.map((reading, index) => {
          const status = getReadingStatus(reading.temperature, reading.humidity);
          return (
            <div key={reading._id || index} className="mobile-reading-card">
              <div className="mobile-card-row mobile-card-header-row">
                <span className="mobile-card-time">{formatLocalTime(reading.timestamp)}</span>
                <span className={`status-pill-badge badge-${status.type}`}>
                  {status.label}
                </span>
              </div>
              <div className="mobile-card-metrics">
                <div className="mobile-metric">
                  <span className="mobile-metric-label">Temperature</span>
                  <span className="mobile-metric-val temp-numeric">
                    {Number(reading.temperature).toFixed(1)} °C
                  </span>
                </div>
                <div className="mobile-metric">
                  <span className="mobile-metric-label">Humidity</span>
                  <span className="mobile-metric-val hum-numeric">
                    {Number(reading.humidity).toFixed(1)} %
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
