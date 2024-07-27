import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/U.css';
import alertify from 'alertifyjs';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/user-list');
      setUsers(response.data);
    } catch (error) {
      console.error('Kullanıcıları çekerken bir hata oluştu:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
     
      const response = await axios.delete(`http://localhost:3000/user/${userId}`);
      
    
      if (response.data) {
    
        alertify.success("Kullanıcı başarılı bir şekilde silindi")
        fetchUsers();
      } else {
        console.error('Kullanıcıyı silerken bir hata oluştu: Yanıtta beklenen "data" özelliği bulunamadı.');
      }
    } catch (error) {
      console.error('Kullanıcıyı silerken bir hata oluştu:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='my-5'>
        <h1>Kullanıcı Listesi</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Kullanıcı Adı</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefon Numarası</TableCell>
                <TableCell>Adres</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.User_Id}>
                  <TableCell>{user.User_Id}</TableCell>
                  <TableCell>{user.UserName}</TableCell>
                  <TableCell>{user.FullName}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Telephone}</TableCell>
                  <TableCell>{user.Address}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDeleteUser(user.User_Id)} color="error">
                      Sil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
};

export default UserList;
