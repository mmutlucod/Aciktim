import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { fetchProductsAsync } from '../redux/productSlice';
import alertify from 'alertifyjs';
import { toast } from "react-toastify";

export const useCartActions = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);


    const handleAddToCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.Product_Id === item.Product_Id);

    console.log(cart);
    if (!isItemInCart) {
      dispatch(addToCart(item));
      toast.success(item.ProductName + ' adlı ürün sepete eklendi', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  };

  const handleRemoveFromCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.Product_Id === item.Product_Id);

    if (isItemInCart) {
      dispatch(removeFromCart(item.Product_Id));
      toast.success(item.ProductName + ' adlı ürün sepetten çıkarıldı', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  };


    const handleFetchProductsAsync = async () => {
        try {
            await dispatch(fetchProductsAsync());
        } catch (error) {
        
            console.error('Ürünleri getirirken bir hata oluştu:', error);
        }
    }

    return { handleAddToCart, handleRemoveFromCart, handleFetchProductsAsync };
}
