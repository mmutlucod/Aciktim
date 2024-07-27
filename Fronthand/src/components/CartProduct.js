import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { increment, decrement, removeProduct,incrementItem,decrementItem } from '../redux/cartSlice';
import '../styles/CartProduct.css';

function CartProduct({ product }) {
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const uint8Array = new Uint8Array(product.ProductPhoto.data);
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    setImageURL(imageUrl);
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [product.ProductPhoto]);

  return (
    <div className="CartProduct">
      <div className="rowItems">
        <div className="row g-3">
          <Typography gutterBottom variant="h6" component="div" className="text-center">
            {product.ProductName}
          </Typography>
          <div className="col-md-6">
            <img src={imageURL} alt="product" style={{ width: '100%' }} />
          </div>
          <div className="col-md-6">
            <div className="frame">
              <div className="top-left">
                
              </div>
              <div className="top-right">
                <div className="button">
                  <IconButton
                    className="trashBtn"
                    onClick={() => dispatch(removeProduct({ Product_Id: product.Product_Id }))}
                  >
                    <DeleteIcon className="trash" />
                  </IconButton>
                </div>
              </div>
              <div className="productDetail">{product.description}</div>
              <div className="bottom-left">
              <Button onClick={() => dispatch(decrementItem({ itemId: product.Product_Id }))}>-</Button> | {product.number} |{' '}
              <Button onClick={() => dispatch(incrementItem({ itemId: product.Product_Id}))}>+</Button>

              </div>
              <div className="bottom-right">
                <Typography variant="h4" className="price">
                  {(product.price * product.number).toFixed(2).toString()} TL
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
