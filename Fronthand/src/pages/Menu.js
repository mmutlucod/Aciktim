import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCartActions } from "../components/addActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Menu() {
  const dispatch = useDispatch();
  const { handleAddToCart, handleRemoveFromCart, handleFetchProductsAsync } = useCartActions();
  const products = useSelector((state) => state.product.items);
  const cart = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    if (!loading) {
      handleFetchProductsAsync();
    }
  }, [loading]);

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const urls = {};
    products.forEach((item) => {
      const uint8Array = new Uint8Array(item.ProductPhoto.data);
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      urls[item.Product_Id] = imageUrl;
    });
    setImageUrls(urls);
  }, [products]);

  return (
    <div>
      <Navbar />
      <Container className="my-5 ">
        <Row className="justify-content-center">
          <Col className="text-center mb-4">
            <h2 className="mb-3">MENÜLER</h2>
            <hr className="w-25 mx-auto " />
          </Col>
        </Row>
        <Row className="justify-content-center text-center  ">
          {products.map((item) => {
            const isInCart = cart.some(cartItem => cartItem.Product_Id === item.Product_Id); // Bu satır her bir ürün için ayrı ayrı kontrol edilir.
            return (
              <Col key={item.Product_Id} className="mb-5 col-lg-4 col-md-4 col-sm-6 col-8">
                <Card sx={{ maxWidth: 300, backgroundColor: "#FCCB4C", margin: "0 auto" }}>
                  <Typography gutterBottom variant="h6" component="div" className="text-center">
                    {item.ProductName}
                  </Typography>
                  <Container className="my-4">
                    <CardMedia sx={{ height: 160, borderRadius: "3%" }} image={imageUrls[item.Product_Id]} title="Menu Item" />
                  </Container>
                  <CardContent>
                    <Typography variant="body2" color="textPrimary">
                      {item.ProductDescription || 'Açıklama bulunmuyor'}
                      <br></br>
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Fiyat:
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₺ {typeof item.price === 'number' ? item.price.toFixed(2).toString() : 'Geçerli bir fiyat yok'}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button size="small" color="primary" onClick={() => isInCart ? handleRemoveFromCart(item) : handleAddToCart(item)}>
                        {isInCart ? 'Sepetten Çıkar' : 'Sepete Ekle'}
                    </Button>
                    <ToastContainer autoClose={1000} />
                  </CardActions>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Menu;