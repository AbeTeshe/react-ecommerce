import { Add, Delete, Remove } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import {  addItemToCart, removeItemFromCart, deleteCart, clearCart } from '../../store/cartSlice';
import "./cart.css";


const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state=> state.cart.items);
  const user = useSelector(state => state.cart.user);
  
  let total = 0;

  for(let i=0; i < cartItems.length; i++){
      total = total + cartItems[i].totalPrice;
  }
  

  const addToCart = (item) => {
      const {id, price, image, title} = item;
      dispatch(addItemToCart({
        id,
        price,
        image,
        quantity:1,
        title,
      }))
}

  const removeFromCart = (id) => {
      dispatch(removeItemFromCart(id));
  }


  const handleDelete = (id) => {
      dispatch(deleteCart(id));
  }

  const clearCarts = () => {
      dispatch(clearCart());
  }

  return (
    <div className="cart">
            {cartItems.length === 0 ? (
                <div className="empyt-cart">
                    <h1>Your Cart is Empty</h1>
                    <Link to="/products"><button className="empty-cart-button">Shop Now to fill</button></Link> 
                </div>
            ) : (<>
                <div className='cart-titles'>
                    <ul>
                        <li>Item</li>
                        <li>Price</li>
                        <li>Quantity</li>
                        <li>Subtotal</li>
                        <li></li>
                    </ul>
                </div>
                <hr className='cart-hr'/>
                <div className='cart-content'>
                    {cartItems.map((item) => 
                    (<ul key={item.id}>
                        <li>
                            <div className='cart-item'>
                                <img src={item.image} alt="cart" className='cart-image'/>
                                <div>
                                   <p>{item.title?.substring(0, 20)}</p>
                                   <p className='cart-price cart-item-price'>${item.price}</p>
                                </div>
                                
                            </div>
                        </li>
                        <li className='cart-price'>${item.price}</li>
                        <li>
                            <div className="cart-quantity-container">
                                <Remove onClick={() => removeFromCart(item.id)}/> 
                                <p>{item.quantity}</p>
                                <Add onClick={() => item.quantity < 10 ? addToCart(item): null}/>
                            </div>
                        </li>
                        <li>${item.totalPrice?.toFixed(2)}</li>
                        <li>
                            <Delete style={{color: 'red'}} onClick={() => handleDelete(item.id)}/>
                        </li>
                    </ul>))}
                </div>
                <hr className='cart-hr'/>
                <div className="cart-buttons">
                    <Link to="/products"><button className="cart-button">Continue Shopping</button></Link>
                    <button className="cart-button" onClick={clearCarts}>Clear Shopping Cart</button>
                </div>
                <div className="subtotal-box">
                    <div className="subtotal-content">
                        <div className="subtotal">
                            <h6>subtotal: </h6>
                            <h6>${total.toFixed(2)}</h6>
                        </div>
                        <div className="shipping-fee">
                            <p>Shipping fee: </p>
                            <p>$5</p>
                        </div>
                        <hr />
                        <div className="total-order">
                            <h3>Order Total:</h3>
                            <h3>${(total+ 5).toFixed(2)}</h3>
                        </div>
                    </div>
                    {user? <Link to="/checkout"><button className="proceedToCheckout">Proceed to Checkout</button></Link>: 
                         <Link to="/login"><button className="proceedToCheckout">Login</button></Link>}
                </div>
            </>)}
    </div>
  )
};


export default Cart;