import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    ProductName: '',
    ProductDescription: '',
    ProductPhoto: '',
    price: '',
   
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ürünü getirirken bir hata oluştu:', error.response?.data?.message || error.message);
      }
    };
  
    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/product/${productId}`, product);
      
      if (response.data) {
        alertify.success("Ürün başarıyla güncellendi");
        navigate("/menus")
 
      } else {
        console.error('Ürünü güncellerken bir hata oluştu: Yanıtta beklenen "data" özelliği bulunamadı.');
      }
    } catch (error) {
      console.error('Ürünü güncellerken bir hata oluştu:', error.response?.data?.message || error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='my-5'>
        <Container component="main" maxWidth="md">
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" mb={3}>
              Ürün Düzenle
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Ürün Adı"
                name="ProductName"
                value={product.ProductName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Açıklama"
                name="ProductDescription"
                value={product.ProductDescription}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Resim URL"
                name="ProductPhoto"
                value={product.ProductPhoto}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Fiyat"
                name="price"
                value={product.price}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
     
              <Button type="submit" variant="contained" color="primary" mt={3}>
                Güncelle
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
