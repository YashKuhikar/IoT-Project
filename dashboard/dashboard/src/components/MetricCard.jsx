export default function MetricCard({
  title,
  currentValue,
  unit,
  icon: Icon,
  min,
  max,
  avg,
  accentColor = 'primary',
  statusBadge,
}) {
  const displayCurrent =
    currentValue !== null && currentValue !== undefined
      ? `${Number(currentValue).toFixed(1)} ${unit}`
      : '--';

  const displayMin = min !== null && min !== undefined ? `${min} ${unit}` : '--';
  const displayMax = max !== null && max !== undefined ? `${max} ${unit}` : '--';
  const displayAvg = avg !== null && avg !== undefined ? `${avg} ${unit}` : '--';

  return (
    <div className={`metric-card metric-card-${accentColor}`}>
      <div className="metric-card-header">
        <div className="metric-card-title-group">
          <div className="metric-icon-wrapper">
            <Icon size={20} className="metric-icon" />
          </div>
          <span className="metric-card-title">{title}</span>
        </div>
        {statusBadge && (
          <span className={`metric-status-badge badge-${statusBadge.type}`}>
            {statusBadge.label}
          </span>
        )}
      </div>

      <div className="metric-card-main">
        <div className="metric-value-display">
          <span key={currentValue ?? 'empty'} className="metric-large-value value-updated">
            {displayCurrent}
          </span>
        </div>
      </div>

      <div className="metric-card-stats">
        <div className="stat-sub-item">
          <span className="stat-label">Min</span>
          <span className="stat-value">{displayMin}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-sub-item">
          <span className="stat-label">Max</span>
          <span className="stat-value">{displayMax}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-sub-item">
          <span className="stat-label">Avg</span>
          <span className="stat-value">{displayAvg}</span>
        </div>
      </div>
    </div>
  );
}
