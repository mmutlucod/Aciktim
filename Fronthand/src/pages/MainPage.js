import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCartActions } from '../components/addActions';
import { ToastContainer } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Modal from '@mui/material/Modal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/MainPage.css';
import halalmeat from '../images/halalmeat.png';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
function MainPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.product.items);
  const { handleAddToCart, handleRemoveFromCart, handleFetchProductsAsync } = useCartActions();
  const cartItems = cart || [];
  const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }));
  useEffect(() => {

    handleFetchProductsAsync();
  }, [handleFetchProductsAsync]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="home">
        <img src={halalmeat} className="halalmeat" />
        <div className="full">
          <div className="red">
            <h1 className="h">ÇOK SATANLAR!</h1>
          </div>

          <Grid container spacing={3} justifyContent="center">
  {cartItems.slice(0, 4).map((item, index) => (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={3} sx={{ backgroundColor: '#FFD600', height: '100%', position: 'relative', textAlign: 'center', padding: '10px' }}>
        <div className="image-container" onClick={() => handleImageClick(item.ProductPhoto)}>
          <img
            src={item.ProductPhoto ? URL.createObjectURL(new Blob([new Uint8Array(item.ProductPhoto.data)], { type: 'image/jpeg' })) : 'placeholder.jpg'}
            alt={item.ProductName}
            className="product-image"
          />
        </div>
        <div className="card-content">
          <Typography variant="h6" gutterBottom className="fw-bold" sx={{ color: '#1C1C1C' }}>
            {item.ProductName}
          </Typography>
          <Typography color="textSecondary" className="fw-bold" sx={{ color: '#1C1C1C' }}>
            Fiyat: ₺ {item.price.toFixed(2)}
          </Typography>
        </div>
        <CardActions sx={{ justifyContent: 'center', pt: 1 }}>
          <Button
            size="small"
            onClick={() => (cart.some((cartItem) => cartItem.id === item.Product_Id) ? handleRemoveFromCart(item) : handleAddToCart(item))}
            sx={{ backgroundColor: cart.some((cartItem) => cartItem.id === item.Product_Id) ? '#EF5350' : '#2196F3', color: 'white' }}
          >
            {cart.some((cartItem) => cartItem.id === item.Product_Id) ? 'Sepetten Çıkar' : 'Sepete Ekle'}
          </Button>
        </CardActions>
      </Paper>
    </Grid>
  ))}
</Grid>
          <ToastContainer autoClose={1000} />
        </div>
      </div>
      <Footer />


      <Modal open={isModalOpen} onClose={handleModalClose} BackdropComponent={StyledBackdrop}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={selectedImage ? URL.createObjectURL(new Blob([new Uint8Array(selectedImage.data)], { type: 'image/jpeg' })) : 'placeholder.jpg'} alt="Large" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </div>
      </Modal>
    </div>
  );
}

export default MainPage;
