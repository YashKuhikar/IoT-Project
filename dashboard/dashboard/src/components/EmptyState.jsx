import { Cpu } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-wrapper">
        <Cpu size={36} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No weather readings yet</h3>
      <p className="empty-state-desc">
        Start the ESP32 simulation to begin receiving sensor data.
      </p>
      <div className="empty-state-tips">
        <span className="tip-badge">ESP32 & DHT22 Simulation</span>
        <span className="tip-text">
          Readings sent to <code>/api/readings</code> will automatically show here in real time.
        </span>
      </div>
    </div>
  );
}
