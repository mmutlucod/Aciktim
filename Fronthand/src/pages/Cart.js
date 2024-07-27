import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCartActions } from '../components/addActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Product from '../components/CartProduct';
import { emptyCart } from '../redux/cartSlice';
import axios from 'axios';  
import alertify from 'alertifyjs';
import '../styles/Cart.css';
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleRemoveFromCart } = useCartActions();
  const cart = useSelector((state) => state.cart.items);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.User_Id;

  let total = 0;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };


  if (cart && cart.length > 0) {
    total = cart.reduce((acc, item) => {
      return acc + parseFloat((item.price * item.number).toFixed(2));
    }, 0);
  }


  const handleCancel = () => {
    dispatch(emptyCart());
    navigate('/');
  };

  const handleCheckout = async () => {
    try {
      
      dispatch(emptyCart());
      const now = new Date();


      const adjustedDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
     
      const orderData = {
        User_Id: userId,
        Payment_Id: 1,
        Order_date: adjustedDate,
      };
  
      // Axios POST isteği
      const orderResponse = await axios.post('http://localhost:3000/order/order-create', orderData);
      console.log('orderResponse:', orderResponse);
  
      if (orderResponse.data && orderResponse.data.Order_Id) {
     
        const orderId = orderResponse.data.Order_Id;
        
        for (const item of cart) {
          const orderDetailsData = {
            Product_Id: item.Product_Id,
            quantity: item.number,
            Order_Id: orderId
          };
  
          // Axios POST isteği
          const orderDetailsResponse = await axios.post('http://localhost:3000/orderdetail/orderdetail-create', orderDetailsData);
          console.log('orderDetailsResponse:', orderDetailsResponse);
          console.log('orderDetailsResponse.data:', orderDetailsResponse.data);
        }
  
      
        navigate('/');
        alertify.success('Sipariş başarıyla oluşturuldu. Afiyet olsun!');
      } else {
        console.error('Sipariş oluşturulurken bir hata oluştu. Beklenen "Order_Id" bulunamadı.');
      }
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  };
  
  return (
    <div className='Cart'>
      <Navbar />
      {cart.map((item) => {
        console.log(item.Product_Id)
        return <Product key={item.id} product={item} handleRemoveFromCart={handleRemoveFromCart} />;
      })}
      <div className='parts'>
        <div className='rowItems'>
          <div className="row g-3">
            <div className="col-md-10">
              <h2>Toplam : {total.toFixed(2)} TL </h2>
            </div>
            <div className="col-md-2">
              <button onClick={handleCancel}>İPTAL</button>
            </div>
          </div>
        </div>
        <button onClick={handleCheckout}>Satın Al</button>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

 