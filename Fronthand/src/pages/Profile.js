import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import man from '../images/Man.png';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfileData(user);
      setEditableFields({
        UserName: user.UserName,
        Email: user.Email,
        Telephone: user.Telephone,
        Address: user.Address,
      });
      fetchOrderHistory(user.User_Id);
    } else {
      alertify.error('Profil bilgileri alınamadı.');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setProfileData({});
    setEditableFields({});
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/user/${profileData.User_Id}`, editableFields);

      if (response.data && response.data.token) {
        console.log("Giriş başarılı. Kullanıcı e-posta:", response.data.user.Email);
        alertify.success("Profil başarıyla güncellendi.");

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        console.log(response.data.user);

        navigate('/');
      } else {
        console.error("Profil güncelleme başarısız. Geçerli kullanıcı verileri alınamadı.");
      }
    } catch (error) {
      console.error('Profil güncelleme hatası:', error.response?.data?.message || error.message);
      alertify.error('Profil güncellenirken bir hata oluştu.');
    }
  };

  const fetchOrderHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/order/${userId}/orders`);
      setOrderHistory(response.data);
    } catch (error) {
      console.error('Sipariş geçmişi alınırken hata oluştu:', error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="Profile" style={{ marginTop: '2rem' }}>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '2rem' }}>
            Profil
          </Typography>
          <div className="row justify-content-start">
            <div className="col-md-4">
              <div className="image" style={{ width: '100%' }}>
                <img src={man} alt="man" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="col-md-8" style={{ marginTop: '2rem' }}>
              <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="item-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '48%' }}>
                    <Typography variant="h6" gutterBottom>
                      Ad Soyad:
                    </Typography>
                    <TextField
                      name="UserName"
                      value={editableFields.UserName}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div style={{ width: '48%' }}>
                    <Typography variant="h6" gutterBottom>
                      E-posta:
                    </Typography>
                    <TextField
                      name="Email"
                      value={editableFields.Email}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="item-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '48%' }}>
                    <Typography variant="h6" gutterBottom>
                      Telefon:
                    </Typography>
                    <TextField
                      name="Telephone"
                      value={editableFields.Telephone}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div style={{ width: '48%' }}>
                    <Typography variant="h6" gutterBottom>
                      Adres:
                    </Typography>
                    <TextField
                      name="Address"
                      value={editableFields.Address}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      multiline
                      rows={4}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="btn" style={{ marginTop: '1rem' }}>
                  <Button type="button" variant="contained" color="primary" onClick={handleUpdateProfile}>
                    Güncelle
                  </Button>
                  <Button type="button" variant="outlined" color="secondary" onClick={handleLogout} style={{ marginLeft: '1rem' }}>
                    ÇIKIŞ
                  </Button>
                </div>
              </Paper>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Sipariş Geçmişi
              </Typography>
              <List>
                {orderHistory.map((order) => (
                  <div key={order.Order_Id}>
                    <ListItem>
                      <ListItemText
                        primary={`Sipariş Numarası: ${order.Order_Id}, Tarih: ${new Date(order.Order_Date).toLocaleString()}, Toplam Tutar: ${calculateTotal(order.Orderdetails)} TL`}
                      />
                    </ListItem>
                    <List>
                      {order.Orderdetails.map((detail) => (
                        <div key={detail.ProductDetails.Product_Id}>
                          <ListItem>
                            <ListItemText
                              primary={detail.ProductDetails.ProductName}
                              secondary={`Miktar: ${detail.quantity}, Fiyat: ${detail.ProductDetails.price} TL`}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      ))}
                    </List>
                    <Divider />
                  </div>
                ))}
              </List>
            </Paper>
          </div>
        </Container>
      </div>
      <div style={{ marginTop: '4rem' }}>
        <Footer />
      </div>
    </div>
  );
};


export default Profile;
const calculateTotal = (orderDetails) => {
  return orderDetails.reduce((total, detail) => total + detail.ProductDetails.price * detail.quantity, 0);
};