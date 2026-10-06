import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Thermometer, Droplets } from 'lucide-react';

import Header from './components/Header';
import MetricCard from './components/MetricCard';
import SummaryCard from './components/SummaryCard';
import TemperatureChart from './components/TemperatureChart';
import HumidityChart from './components/HumidityChart';
import RecentReadings from './components/RecentReadings';
import ConnectionStatus from './components/ConnectionStatus';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';

import { getReadings } from './services/api';
import { calculateStats, getReadingStatus } from './utils/statistics';

const REFRESH_INTERVAL_MS = 5000;

export default function App() {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const isFetchingRef = useRef(false);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async (isInitial = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (!isInitial) {
      setIsRefreshing(true);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const data = await getReadings(abortControllerRef.current.signal);
      setReadings(data);
      setIsConnected(true);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.warn('Backend sync failed:', err.message);
      setIsConnected(false);
      setError('Unable to fetch weather readings. Make sure the Node.js backend is running on port 5000.');
    } finally {
      isFetchingRef.current = false;
      if (isInitial) {
        setIsLoading(false);
      }
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function initialLoad() {
      try {
        const data = await getReadings(controller.signal);
        if (!ignore) {
          setReadings(data);
          setIsConnected(true);
          setError(null);
          setLastUpdated(new Date());
        }
      } catch (err) {
        if (!ignore && err.name !== 'AbortError') {
          console.warn('Backend initial fetch failed:', err.message);
          setIsConnected(false);
          setError('Unable to fetch weather readings. Make sure the Node.js backend is running on port 5000.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    initialLoad();

    const intervalId = setInterval(() => {
      fetchData(false);
    }, REFRESH_INTERVAL_MS);

    return () => {
      ignore = true;
      controller.abort();
      clearInterval(intervalId);
    };
  }, [fetchData]);

  const handleManualRefresh = () => {
    fetchData(false);
  };

  const latestReading = useMemo(() => {
    if (!readings || readings.length === 0) return null;
    return readings[readings.length - 1];
  }, [readings]);

  const tempStats = useMemo(() => calculateStats(readings, 'temperature'), [readings]);
  const humStats = useMemo(() => calculateStats(readings, 'humidity'), [readings]);

  const tempStatus = useMemo(() => {
    if (!latestReading) return null;
    return getReadingStatus(latestReading.temperature, latestReading.humidity);
  }, [latestReading]);

  return (
    <div className="app-layout">
      <div className="app-container">
        <Header
          isConnected={isConnected}
          isRefreshing={isRefreshing}
          onManualRefresh={handleManualRefresh}
          lastUpdated={lastUpdated}
        />

        <main className="dashboard-main">
          {error && (
            <ConnectionStatus
              error={error}
              onRetry={handleManualRefresh}
              isRetrying={isRefreshing}
            />
          )}

          {isLoading ? (
            <LoadingSkeleton />
          ) : readings.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Primary Metric Cards */}
              <section className="metric-grid" aria-label="Key Weather Metrics">
                <MetricCard
                  title="Temperature"
                  currentValue={latestReading?.temperature}
                  unit="°C"
                  icon={Thermometer}
                  min={tempStats.min}
                  max={tempStats.max}
                  avg={tempStats.avg}
                  accentColor="temp"
                  statusBadge={tempStatus}
                />

                <MetricCard
                  title="Humidity"
                  currentValue={latestReading?.humidity}
                  unit="%"
                  icon={Droplets}
                  min={humStats.min}
                  max={humStats.max}
                  avg={humStats.avg}
                  accentColor="humidity"
                />
              </section>

              {/* Summary Information Bar */}
              <section className="summary-section" aria-label="Monitoring Summary">
                <SummaryCard
                  lastUpdated={lastUpdated}
                  totalReadings={readings.length}
                  isConnected={isConnected}
                  isRefreshing={isRefreshing}
                />
              </section>

              {/* Line Charts Section */}
              <section className="charts-grid" aria-label="Historical Charts">
                <TemperatureChart readings={readings} />
                <HumidityChart readings={readings} />
              </section>

              {/* Recent Readings Table */}
              <section className="recent-section" aria-label="Recent Sensor Readings">
                <RecentReadings readings={readings} />
              </section>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
