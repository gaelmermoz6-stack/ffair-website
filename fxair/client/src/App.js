import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home            from './pages/Home';
import Login           from './pages/Login';
import Register        from './pages/Register';
import PremiumCharter  from './pages/PremiumCharter';
import Memberships     from './pages/Memberships';
import Destinations    from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import FXSelect        from './pages/FXSelect';
import Contact         from './pages/Contact';
import Blog            from './pages/Blog';

// Pages auth sans Navbar/Footer
const AuthLayout = ({ children }) => <>{children}</>;

// Pages normales avec Navbar/Footer
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Pages auth — layout minimal */}
            <Route path="/login"    element={<AuthLayout><Login    /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

            {/* Pages principales */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/en-us" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/en-us/premium-charter" element={<MainLayout><PremiumCharter /></MainLayout>} />
            <Route path="/en-us/memberships"     element={<MainLayout><Memberships /></MainLayout>} />
            <Route path="/en-us/destinations"    element={<MainLayout><Destinations /></MainLayout>} />
            <Route path="/en-us/destinations/:slug" element={<MainLayout><DestinationDetail /></MainLayout>} />
            <Route path="/en-us/fxselect"  element={<MainLayout><FXSelect /></MainLayout>} />
            <Route path="/en-us/contact"   element={<MainLayout><Contact /></MainLayout>} />
            <Route path="/en-us/blog"      element={<MainLayout><Blog /></MainLayout>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
