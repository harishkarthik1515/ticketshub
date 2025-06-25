import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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