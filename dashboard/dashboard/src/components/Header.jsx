import { Radio, RefreshCw } from 'lucide-react';

export default function Header({ isConnected, isRefreshing, onManualRefresh }) {
  return (
    <header className="header-container">
      <div className="header-brand">
        <div className="header-title-row">
          <div className="header-icon-badge">
            <Radio className="header-main-icon" size={22} />
          </div>
          <div>
            <h1 className="header-title">IoT Weather Monitoring</h1>
            <p className="header-subtitle">ESP32 + DHT22 Environmental Monitoring</p>
          </div>
        </div>
      </div>

      <div className="header-actions">
        <div
          className={`status-pill ${isConnected ? 'status-connected' : 'status-disconnected'}`}
          role="status"
          aria-live="polite"
        >
          <span className="status-dot-pulse"></span>
          <span className="status-dot"></span>
          <span className="status-text">{isConnected ? 'Live' : 'Offline'}</span>
        </div>

        <button
          className={`refresh-btn ${isRefreshing ? 'is-spinning' : ''}`}
          onClick={onManualRefresh}
          title="Refresh data"
          aria-label="Refresh data"
          disabled={isRefreshing}
        >
          <RefreshCw size={15} className="refresh-icon" />
          <span className="refresh-btn-text">Refresh</span>
        </button>
      </div>
    </header>
  );
}
