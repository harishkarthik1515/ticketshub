import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import StateSelector from './components/StateSelector';
import TrendingEvents from './components/TrendingEvents';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import StatePage from './pages/StatePage';
import EventDetailsPage from './pages/EventDetailsPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';

function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <StateSelector />
      <TrendingEvents />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      '/ticketshub_logo.png',
      '/concert-background.png'
    ];

    const imagePromises = preloadImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails
        img.src = src;
      });
    });

    // Wait for images and minimum time
    Promise.all([
      ...imagePromises,
      new Promise(resolve => setTimeout(resolve, 5500)) // Minimum 5.5s for full experience
    ]).then(() => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  const handlePreloaderComplete = () => {
    // Additional cleanup if needed
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/state/:stateName" element={<StatePage />} />
            <Route path="/event/:eventId" element={<EventDetailsPage />} />
            <Route path="/booking/:eventId" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;