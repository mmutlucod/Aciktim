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
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product/product-list');
      setProducts(response.data);
    } catch (error) {
      console.error('Ürünleri çekerken bir hata oluştu:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
  
      const response = await axios.delete(`http://localhost:3000/product/${productId}`);

   
      if (response.data) {
     
        alertify.success("Ürün başarılı bir şekilde silindi")
        fetchProducts();
      } else {
        console.error('Ürünü silerken bir hata oluştu: Yanıtta beklenen "data" özelliği bulunamadı.');
      }
    } catch (error) {
      console.error('Ürünü silerken bir hata oluştu:', error.response?.data?.message || error.message);
    }
  };
  
  const handleEditProduct = (productId) => {
    navigate(`/menuduzen/${productId}`);
  };

  return (
    <div>
      <Navbar />
      <div className='my-5'>
        <h1>Ürün Listesi</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ürün Adı</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>Resim</TableCell>
                <TableCell>Fiyat</TableCell>
                <TableCell>İşlemler</TableCell>
                {/* Diğer sütunları ekleyebilirsiniz */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.Product_Id}>
                  <TableCell>{product.Product_Id}</TableCell>
                  <TableCell>{product.ProductName}</TableCell>
                  <TableCell>
                    <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.ProductDescription}
                    </div>
                  </TableCell>
                  <TableCell>
                    <img src={product.ProductPhoto} alt={product.ProductName} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDeleteProduct(product.Product_Id)} color="error">
                      Sil
                    </Button>
                 
                    <span style={{ margin: '0 8px' }}></span>
                    <Button variant="contained" onClick={() => handleEditProduct(product.Product_Id)} color="secondary">
                      Düzenle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={5}
            page={0}
            onPageChange={() => { }}
            onRowsPerPageChange={() => { }}
          />
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;