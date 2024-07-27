//import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/SignIn.css"
import Burger from '../images/Burger.jpeg'
import React, { useState } from 'react'

import alertify from "alertifyjs"
import validations from '../validation/index';

import { useDispatch } from "react-redux"
import { addUser, getCurrentUser } from '../redux/userSlice'
import { useSelector } from "react-redux"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function SignIn() {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerification, setPasswordVerification] = useState("")

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isVisible, setIsVisible] = useState(false)
    const [isVerificationVisible, setIsVerificationVisible] = useState(false)


    const dispatch = useDispatch()
    
    const index = useSelector((state) => state.user.currentUserIndex);
    const users = useSelector((state) => state.user.users);
    const currentUser = users[index]


    const handleSubmit = async (e) => {
        e.preventDefault()
      
        const validFieldsCount = Object.keys(errors).filter(fieldName => !errors[fieldName]).length;
        try {
         
            const response = await axios.post('http://localhost:3000/user/user-create', {
              FullName:name,
              UserName:userName,
              Email:email,
              Telephone:phoneNumber,
              Passwords:password,
              Address:address,
             
            });
      
          
            
      
          
            alert('Kullanıcı başarıyla kaydedildi.');
      
      
            navigate('/');
          } catch (error) {
            console.error('Kayıt hatası:', error.message);
          
            alert('Kayıt olma sırasında bir hata oluştu.');
          }
    }

    const handleCancel = (e) => {
        alertify.success("Ana sayfa") 
        navigate("/");
    } 

    const handleChange = (e) => {
        const { name, value } = e.target;

      
        if (name === "name") {
            setName(value);
        } else if (name === "userName") {
            setUserName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "phoneNumber") {
            setPhoneNumber(value);
        } else if (name === "address") {
            setAddress(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "passwordVerification") {
            setPasswordVerification(value);
        }


        setTouched({
            ...touched,
            [name]: true,
        });

      
        const fieldSchema = name === "passwordVerification" ? validations.fields["password"] : validations.fields[name]; 


       
        fieldSchema.validate(value)
            .then(() => {
                
                setErrors({
                    ...errors,
                    [name]: '',
                });
            })
            .catch(validationErrors => {

                setErrors({
                    ...errors,
                    [name]: validationErrors.message,
                });
            });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    return (
        <div>
            <Navbar />

            <div className='SingIn'>

                <h1 >Kayıt Ol</h1>

                <form onSubmit={handleSubmit}>

                    <div className='image' style={{ width: "50%" }}>
                        <img src={Burger} alt="Burger" style={{ width: '50%' }} />
                    </div>

                    <div className="row g-3" >

                        <div className="col-md-6">
                            <label className="Item" htmlFor="name">Ad Soyad</label> <br></br>
                            <input name="name" placeholder="Ad Soyad" value={name} onChange={handleChange} />
                            {errors.name && touched.name && <label className='error'>{errors.name}</label>}
                        </div>

                        <div className="col-md-6">
                            <label className="Item" htmlFor="userName">Kullanıcı Adı</label> <br></br>
                            <input name="userName" placeholder="Kullanıcı Adı" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            {errors.userName && touched.userName && <label className='error'>{errors.userName}</label>}
                        </div>

                        <div className="col-md-6">
                            <label className="Item" htmlFor="email">E-posta</label>  <br></br>
                            <input name="email" placeholder="E-posta" value={email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email && <label className='error'>{errors.email}</label>}
                        </div>

                        <div className="col-md-6">
                            <label className="Item" htmlFor="phoneNumber">Telefon</label> <br></br>
                            <input name="phoneNumber" placeholder="Telefon" value={phoneNumber} onChange={handleChange} />
                            {errors.phoneNumber && touched.phoneNumber && <label className='error'>{errors.phoneNumber}</label>}
                        </div>


                        <div className="col-md-6">
                            <label className="Item">Şifre</label>  <br></br>
                            <input type={isVisible ? "" : "password"} name="password" value={password} onChange={handleChange} />
                            <button className="eyeBtn" type="button" onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? <VisibilityOffIcon className='eye' /> : <VisibilityIcon className='eye' />}
                            </button>
                            {errors.password && touched.password && <label className='error'>{errors.password}</label>}
                        </div>

                        <div className="col-md-6">
                            <label className="Item" htmlFor="address">Adres</label> <br></br>
                            <textarea name="address" placeholder="Adres" value={address} onChange={handleChange} />
                            {errors.address && touched.address && <label className='error'>{errors.address}</label>}
                        </div>

                        <div className="col-md-6">
                            <label className="Item">Şifre Doğrulama</label>  <br></br>
                            <input type={isVerificationVisible ? "" : "password"} name="passwordVerification" value={passwordVerification} onChange={handleChange} />
                            <button className="eyeBtn" type="button" onClick={() => setIsVerificationVisible(!isVerificationVisible)}>
                                {isVerificationVisible ? <VisibilityOffIcon className='eye' /> : <VisibilityIcon className='eye' />}
                            </button>
                            {touched.passwordVerification && touched.passwordVerification && <label className='error'>{errors.passwordVerification}</label>}
                        </div>


                        <div className='btn'>
                            <button type='submit' onClick={handleSubmit}>KAYIT OL</button>

                            <button type="button" onClick={handleCancel}>İPTAL</button>
                        </div>


                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default SignIn

