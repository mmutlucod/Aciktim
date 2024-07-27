import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useSelector } from 'react-redux';
import woman from '../images/Woman.png';

import alertify from 'alertifyjs';

function Navbar() {
  const currentUserIndex = useSelector((state) => state.user.currentUserIndex);
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = currentUser && currentUser.User_Id === 1;
  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (token == null) {
      alertify.error('Önce giriş yapınız!');
    }
  };

  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/" className="aciktim">
          <LunchDiningIcon className="burger" /> ACIKTIM!
        </Link>
      </div>

      <div className="links">
        {isAdmin && (
          <>
            <Link to="/kullanici" className="link admin-link">
              <GroupIcon className="logo" /> KULLANICILAR
            </Link>
            <Link to="/order" className="link admin-link">
              <ShoppingBasketIcon className="logo" /> SİPARİŞLER
            </Link>
            <Link to="/menus" className="link admin-link">
              <RestaurantMenuIcon className="logo" /> MENÜLER
            </Link>
            <Link to="/menua" className="link admin-link">
              <AddCircleOutlineIcon className="logo" /> MENÜ EKLE
            </Link>
          </>
        )}
        <Link to="/menü" className="link">
          <FastfoodIcon className="logo" /> MENÜ
        </Link>

        {token == null ? (
          <Link to="/giris" className="link">
            <AccountCircleIcon className="logo" /> GİRİŞ
          </Link>
        ) : (
          <Link to="/profil" className="link">
            <AccountCircleIcon className="logo" /> PROFİL
          </Link>
        )}
        {token == null ? (
          <Link to="/giris" onClick={handleClick} className="link">
            <ShoppingBasketIcon className="logo" /> SEPET
          </Link>
        ) : (
          <Link to="/sepetim" onClick={handleClick} className="link">
            <ShoppingBasketIcon className="logo" /> SEPET
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
