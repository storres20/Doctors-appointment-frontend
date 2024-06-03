import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Reserve from './pages/Reserve';
import MyReservations from './pages/MyReservations/MyReservations';
import Add from './pages/Add/Add';
import Delete from './pages/Delete/Delete';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import Login from './pages/Login/Login';

const App = () => {
  /* LocalStorage - Login */
  const storedUser = JSON.parse(localStorage.getItem('user')) || '';

  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <BrowserRouter>
      <div className={user ? 'AppContainer' : ''}>
        <div className={user ? '' : 'hidden'}>
          <Navbar />
        </div>
        <div className={user ? 'RoutesContainer' : ''}>
          <Routes>
            {!user && (
            <Route path="/" element={<Login authenticate={(username) => setUser(username)} />} />
            )}

            {user && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/reserve/:id" element={<Reserve />} />
                <Route path="/myreservations" element={<MyReservations />} />
                <Route path="/add" element={<Add />} />
                <Route path="/delete" element={<Delete />} />

                <Route path="/detailspage/:id" element={<DetailsPage />} />
                <Route path="/*" element={<Navigate to={user ? '/home' : '/'} />} />
              </>
            )}

            <Route path="/*" element={<Navigate to={user ? '/home' : '/'} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
