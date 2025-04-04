import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import InterviewBots from './pages/InterviewBots';
import Team from './pages/Team';
import LoadingScreen from './components/common/LoadingScreen';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/common/Toaster';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(handleLoadingComplete, 1500);

    return () => clearTimeout(timer);
  }, [handleLoadingComplete]);

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <div className="min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/interview-bots" element={<InterviewBots />} />
                  <Route path="/team" element={<Team />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
