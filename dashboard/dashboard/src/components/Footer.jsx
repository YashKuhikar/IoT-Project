export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-primary-text">IoT Weather Monitoring System</p>
        <p className="footer-tech-stack">
          ESP32 <span className="footer-bullet">•</span> DHT22{' '}
          <span className="footer-bullet">•</span> Node.js{' '}
          <span className="footer-bullet">•</span> MongoDB
        </p>
      </div>
    </footer>
  );
}
