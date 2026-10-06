import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Thermometer } from 'lucide-react';
import { formatChartTime } from '../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TemperatureChart({ readings }) {
  const chartData = useMemo(() => {
    if (!readings || readings.length === 0) return null;

    const labels = readings.map((r) => formatChartTime(r.timestamp));
    const dataPoints = readings.map((r) => r.temperature);

    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: dataPoints,
          borderColor: '#f97316', // Professional warm amber/orange
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 240);
            gradient.addColorStop(0, 'rgba(249, 115, 22, 0.18)');
            gradient.addColorStop(1, 'rgba(249, 115, 22, 0.00)');
            return gradient;
          },
          fill: true,
          tension: 0.38,
          pointRadius: readings.length > 25 ? 2 : 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#f97316',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          borderWidth: 2,
        },
      ],
    };
  }, [readings]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#94a3b8',
          bodyColor: '#f8fafc',
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: (items) => `Time: ${items[0].label}`,
            label: (item) => `Temperature: ${item.formattedValue} °C`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(226, 232, 240, 0.6)',
            tickLength: 6,
          },
          ticks: {
            color: '#64748b',
            font: { size: 11, family: 'Inter, sans-serif' },
            maxTicksLimit: 8,
            maxRotation: 0,
          },
          border: {
            display: false,
          },
        },
        y: {
          grid: {
            color: 'rgba(226, 232, 240, 0.6)',
          },
          ticks: {
            color: '#64748b',
            font: { size: 11, family: 'Inter, sans-serif' },
            callback: (value) => `${value} °C`,
          },
          border: {
            display: false,
          },
        },
      },
      animation: {
        duration: 400,
      },
    };
  }, []);

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-title-group">
          <div className="chart-icon-badge temp-badge">
            <Thermometer size={16} />
          </div>
          <h3 className="chart-title">Temperature History</h3>
        </div>
        <span className="chart-legend-pill temp-pill">Live °C</span>
      </div>

      <div className="chart-canvas-wrapper">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="chart-empty-fallback">No data points available</div>
        )}
      </div>
    </div>
  );
}
