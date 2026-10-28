import { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Students from './Students';
import Courses from './Courses';
import Faculty from './Faculty';
import About from './About';
import { checkBackendConnection } from './api';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(false);

  const testConnection = useCallback(async () => {
    setChecking(true);
    const connected = await checkBackendConnection();
    setIsConnected(connected);
    setChecking(false);
  }, []);

  useEffect(() => {
    testConnection();
    // Periodically re-check connection every 15 seconds
    const interval = setInterval(testConnection, 15000);
    return () => clearInterval(interval);
  }, [testConnection]);

  return (
    <HashRouter>
      <div className="app-layout">
        <Navbar
          isConnected={isConnected}
          onCheckConnection={testConnection}
          checking={checking}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isConnected={isConnected} />} />
            <Route path="/students" element={<Students isConnected={isConnected} />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
