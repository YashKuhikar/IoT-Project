import { Clock, Database, Activity, Wifi } from 'lucide-react';
import { formatLocalTime } from '../utils/formatters';

export default function SummaryCard({
  lastUpdated,
  totalReadings = 0,
  isConnected = false,
  isRefreshing = false,
}) {
  return (
    <div className="summary-bar">
      <div className="summary-item">
        <div className="summary-item-icon">
          <Clock size={16} />
        </div>
        <div className="summary-item-content">
          <span className="summary-item-label">Latest Update</span>
          <span className="summary-item-value">
            {lastUpdated ? formatLocalTime(lastUpdated) : '--:--:--'}
          </span>
        </div>
      </div>

      <div className="summary-separator" />

      <div className="summary-item">
        <div className="summary-item-icon">
          <Database size={16} />
        </div>
        <div className="summary-item-content">
          <span className="summary-item-label">Total Readings</span>
          <span className="summary-item-value">{totalReadings}</span>
        </div>
      </div>

      <div className="summary-separator" />

      <div className="summary-item">
        <div className="summary-item-icon">
          <Activity size={16} />
        </div>
        <div className="summary-item-content">
          <span className="summary-item-label">Monitoring</span>
          <span className="summary-item-value">
            {isConnected ? (isRefreshing ? 'Syncing...' : 'Active') : 'Paused'}
          </span>
        </div>
      </div>

      <div className="summary-separator" />

      <div className="summary-item">
        <div className="summary-item-icon">
          <Wifi size={16} />
        </div>
        <div className="summary-item-content">
          <span className="summary-item-label">Backend</span>
          <span className={`summary-item-value ${isConnected ? 'text-connected' : 'text-disconnected'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </div>
  );
}
