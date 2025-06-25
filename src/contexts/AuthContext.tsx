import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tickets: Ticket[];
}

interface Ticket {
  id: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  location: string;
  quantity: number;
  totalAmount: number;
  bookingDate: string;
  qrCode: string;
  status: 'confirmed' | 'cancelled';
  seatNumbers?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { name: string; email: string; password: string; phone: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  addTicket: (ticket: Omit<Ticket, 'id' | 'bookingDate' | 'qrCode'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo user data
const DEMO_USER = {
  id: 'demo-user-1',
  name: 'John Doe',
  email: 'demo@ticketshub.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  tickets: []
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('ticketshub_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - accept demo credentials or any email/password combination
    if (email === 'demo@ticketshub.com' && password === 'demo123') {
      const userData = { ...DEMO_USER };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('ticketshub_user', JSON.stringify(userData));
      return true;
    } else if (email && password) {
      // For demo purposes, accept any valid email/password
      const userData = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '+91 98765 43210',
        tickets: []
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('ticketshub_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (userData: { name: string; email: string; password: string; phone: string }): Promise<boolean> => {
    // For demo purposes, accept any signup
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      tickets: []
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('ticketshub_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ticketshub_user');
    
    // Force redirect to home page
    window.location.href = '/';
  };

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'bookingDate' | 'qrCode'>) => {
    if (!user) return;

    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      bookingDate: new Date().toISOString(),
      qrCode: generateQRCode(ticketData),
      status: 'confirmed'
    };

    const updatedUser = {
      ...user,
      tickets: [...user.tickets, newTicket]
    };

    setUser(updatedUser);
    localStorage.setItem('ticketshub_user', JSON.stringify(updatedUser));
  };

  const generateQRCode = (ticketData: Omit<Ticket, 'id' | 'bookingDate' | 'qrCode'>): string => {
    // Generate a simple QR code data string
    const qrData = {
      eventId: ticketData.eventId,
      eventTitle: ticketData.eventTitle,
      quantity: ticketData.quantity,
      venue: ticketData.venue,
      date: ticketData.eventDate,
      time: ticketData.eventTime
    };
    return btoa(JSON.stringify(qrData));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    addTicket
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};