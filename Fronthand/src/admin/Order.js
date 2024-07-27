import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/order/order-list');
        setOrders(response.data);
      } catch (error) {
        console.error('Siparişleri çekerken bir hata oluştu:', error.response?.data?.message || error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='my-5'>
        <h1>Sipariş Listesi</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Kullanıcı Adı</TableCell>
                <TableCell>İsim</TableCell>
                <TableCell>Adres</TableCell>
                <TableCell> Toplam Fiyat</TableCell>
                <TableCell>Sipariş Tarihi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.Order_Id}>
                  <TableCell>{order.User.UserName}</TableCell>
                  <TableCell>{order.User.FullName}</TableCell>
                  <TableCell>{order.User.Address}</TableCell>
                  <TableCell>{calculateTotal(order.Orderdetails)}</TableCell>
                  <TableCell>{order.Order_Date ? new Date(order.Order_Date).toLocaleDateString() : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={5}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
};

export default OrderList;

const calculateTotal = (orderDetails) => {
  return orderDetails.reduce((total, detail) => total + detail.ProductDetails.price * detail.quantity, 0);
};