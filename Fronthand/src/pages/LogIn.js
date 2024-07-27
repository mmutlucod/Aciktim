import React, { useState } from 'react';
import axios from 'axios';
import Burger from '../images/Burger.jpeg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "../styles/LogIn.css";
import alertify from 'alertifyjs';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3000/user/login', userData);

      if (response.data && response.data.token) {
        console.log("Giriş başarılı. Kullanıcı e-posta:", response.data.user.Email);
        alertify.success("Giriş başarılı");
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log(response.data.user)
        
    
        navigate('/');
      } else {
        console.error("Giriş başarısız. Geçerli kullanıcı verileri alınamadı.");
      }
    } catch (error) {
      console.error('Giriş hatası:', error.message);
      alertify.error("Email ya da şifre hatalı")
    }
  };

  

  const handleNavigate = () => {
    navigate("/kayit");
  };

  const handleMessage = () => {
    navigate("/sifremiunuttum");
  };

  return (
    <div>
      <Navbar />
      <br></br><br></br>
      <div className='LogIn'>
        <h1 >Üye Girişi</h1>
        <form method='POST' onSubmit={(e) => handleSubmit(e)}>
          <div className='image'>
            <img className='burger' src={Burger} alt="Burger" />
          </div>
          <div className="row g-3" >
            <div className="col-md-6">
              <label className="Item">E-Posta</label>
              <br></br>
              <input type="email" name="Email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
             

              <br></br>
            </div>
            <div className="col-md-6">
              <label className="Item">Şifre</label>
              <br></br>
              <input input type="password" className="password" name="Passwords" id="password" placeholder='Şifre' value={password} onChange={(e) => setPassword(e.target.value)} />
              <br></br>
              {/* <div>
                {getUserList()}
              </div> */}
            </div>
            <div className="col-md-3 mx-auto">
              <div className='btn'>
                <Button type='submit' className='giris'  onClick={handleSubmit} > Giriş </Button>
            
                <br></br><br />
                <Button type="button" className='d-flex'  color='error' onClick={handleMessage}>şifremi unuttum</Button>
                <br></br>
                <Button type="button" className='d-flex'  color='success'  onClick={handleNavigate}>Hesabım yok</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
      
    </div>
  );
}

export default Login;
