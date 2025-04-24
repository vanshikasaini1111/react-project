import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          if (!['/login', '/signup'].includes(window.location.pathname)) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        dispatch(logout());
        if (!['/login', '/signup'].includes(window.location.pathname)) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
      <h1 className="text-center w-full py-4 text-xl">
        A blog with Appwrite
      </h1>
    </div>
  );
}

export default App;
