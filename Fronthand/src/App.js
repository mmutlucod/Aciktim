// App.js

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import U from './admin/U';
import M from './admin/M';
import MenuA from './admin/MenuA';
import O from './admin/Order';
import MenuEdit from './admin/MenuEdit'
import MainPage from './pages/MainPage';
import LogIn from './pages/LogIn';
import Menu from './pages/Menu';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  const token = localStorage.getItem('token');


  const isAuthenticated = () => {
    return token !== undefined && token !== null && token !== '';
  };

  const isUserAuthorized = (requiredUserId) => {
    const storedUser = localStorage.getItem('user');
   
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      return isAuthenticated() && currentUser.User_Id === requiredUserId;
    }
    return false;
  };
  

  const redirectToSignInIfNotAllowed = () => {
    if (!isAuthenticated()) {
      return <Navigate to="/giris" />;
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/kayit" element={<SignIn />} />
          <Route path="/giris" element={<LogIn />} />
          <Route path="/sifremiunuttum" element={<ForgotPassword />} />
          <Route path="/menü" element={<Menu />} />

    
          <Route
            path="/profil"
            element={
              isAuthenticated() || isUserAuthorized(1) ? (
                <Profile />
              ) : (
                <Navigate to="/giris" />
              )
            }
          />
          <Route
            path="/sepetim"
            element={
              isAuthenticated()|| isUserAuthorized(1) ? (
                <Cart />
              ) : (
                <Navigate to="/giris" />
              )
            }
          />
          <Route
            path="/kullanici"
            element={
              isUserAuthorized(1) ? <U /> : <Navigate to="/giris" />
            }
          />
          <Route
            path="/menus"
            element={
              isUserAuthorized(1) ? <M /> : <Navigate to="/giris" />
            }
          />
          <Route
            path="/menuduzen/:productId"
            element={
              isUserAuthorized(1) ? <MenuEdit /> : <Navigate to="/giris" />
            }
          />
         
          <Route
            path="/menua"
            element={
              isUserAuthorized(1) ? <MenuA /> : <Navigate to="/giris" />
            }
          />
          <Route
            path="/order"
            element={
              isUserAuthorized(1) ? <O /> : <Navigate to="/giris" />
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
