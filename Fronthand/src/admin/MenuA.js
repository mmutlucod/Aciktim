import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import alertify from 'alertifyjs';

import { useNavigate } from 'react-router-dom';
const MenuAdd = () => {
    const nav = useNavigate();
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    ProductDescription: '',
    ProductPhoto: '',
    price: '',
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/product/product-create', newProduct);

      if (response.data) {
        alertify.success('Ürün başarıyla eklendi');
       nav("/menus")
      } else {
        console.error('Ürün eklenirken bir hata oluştu: Yanıtta beklenen "data" özelliği bulunamadı.');
      }
    } catch (error) {
      console.error('Ürün eklenirken bir hata oluştu:', error.response?.data?.message || error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='my-5'>
        <Container component="main" maxWidth="md">
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" mb={3}>
              Ürün Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Ürün Adı"
                    name="ProductName"
                    value={newProduct.ProductName}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Açıklama"
                    name="ProductDescription"
                    value={newProduct.ProductDescription}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Resim URL"
                    name="ProductPhoto"
                    value={newProduct.ProductPhoto}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Fiyat"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Diğer özellikleri ekleyebilirsiniz */}
              <Button type="submit" variant="contained" color="primary" mt={3}>
                Ekle
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
      <Footer />
    </div>
  );
};


export default MenuAdd;
