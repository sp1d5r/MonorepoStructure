import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollableLayout from './layouts/ScrollableLayout';
import { Landing } from './pages/Landing';
import { Authentication } from './pages/Authentication';
import { DarkModeProvider } from './contexts/DarkModeProvider';
import { AuthProvider } from './contexts/AuthenticationProvider';
import { ResetPassword } from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Articles } from './pages/Articles';

// Example components for different routes
const About = () => <ScrollableLayout><h2>About Page</h2></ScrollableLayout>;
const Contact = () => <ScrollableLayout><h2>Contact Page</h2></ScrollableLayout>;
const NotFound = () => <ScrollableLayout><h2>No Clue Mate...</h2></ScrollableLayout>

function App() {
  return (
    <div className='dark:bg-gray-900'>
      <Router>
        <DarkModeProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/articles" element={<Articles />} />

              {/* Authentication Pages */}
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Main Page */}
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </DarkModeProvider>
      </Router>
    </div>
  );
}

export default App;