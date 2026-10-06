export default function LoadingSkeleton() {
  return (
    <div className="skeleton-container" aria-label="Loading dashboard data">
      {/* Metric Cards Skeleton */}
      <div className="metric-grid">
        <div className="skeleton-card skeleton-metric">
          <div className="skeleton-line skeleton-header-line"></div>
          <div className="skeleton-line skeleton-large-value"></div>
          <div className="skeleton-stats-row">
            <div className="skeleton-line skeleton-stat-sub"></div>
            <div className="skeleton-line skeleton-stat-sub"></div>
            <div className="skeleton-line skeleton-stat-sub"></div>
          </div>
        </div>

        <div className="skeleton-card skeleton-metric">
          <div className="skeleton-line skeleton-header-line"></div>
          <div className="skeleton-line skeleton-large-value"></div>
          <div className="skeleton-stats-row">
            <div className="skeleton-line skeleton-stat-sub"></div>
            <div className="skeleton-line skeleton-stat-sub"></div>
            <div className="skeleton-line skeleton-stat-sub"></div>
          </div>
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className="skeleton-card skeleton-summary">
        <div className="skeleton-line skeleton-summary-item"></div>
        <div className="skeleton-line skeleton-summary-item"></div>
        <div className="skeleton-line skeleton-summary-item"></div>
        <div className="skeleton-line skeleton-summary-item"></div>
      </div>

      {/* Charts Skeleton */}
      <div className="charts-grid">
        <div className="skeleton-card skeleton-chart">
          <div className="skeleton-line skeleton-chart-title"></div>
          <div className="skeleton-chart-box"></div>
        </div>
        <div className="skeleton-card skeleton-chart">
          <div className="skeleton-line skeleton-chart-title"></div>
          <div className="skeleton-chart-box"></div>
        </div>
      </div>

      {/* Recent Readings Table Skeleton */}
      <div className="skeleton-card skeleton-table-container">
        <div className="skeleton-line skeleton-table-title"></div>
        <div className="skeleton-table-rows">
          <div className="skeleton-line skeleton-row"></div>
          <div className="skeleton-line skeleton-row"></div>
          <div className="skeleton-line skeleton-row"></div>
          <div className="skeleton-line skeleton-row"></div>
        </div>
      </div>
    </div>
  );
}
