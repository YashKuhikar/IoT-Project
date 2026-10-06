import { RefreshCw, ServerOff } from 'lucide-react';

export default function ConnectionStatus({ error, onRetry, isRetrying }) {
  if (!error) return null;

  return (
    <div className="connection-error-banner" role="alert">
      <div className="connection-error-content">
        <div className="connection-error-icon">
          <ServerOff size={22} />
        </div>
        <div className="connection-error-text">
          <h4 className="connection-error-title">Backend unavailable</h4>
          <p className="connection-error-desc">
            Unable to fetch weather readings. Make sure the Node.js backend is running on port 5000.
          </p>
        </div>
      </div>
      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="connection-retry-btn"
        aria-label="Retry connecting to backend"
      >
        <RefreshCw size={14} className={isRetrying ? 'is-spinning' : ''} />
        <span>{isRetrying ? 'Connecting...' : 'Retry Connection'}</span>
      </button>
    </div>
  );
}
