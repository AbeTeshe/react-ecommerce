import { ShoppingCart, PersonAddAlt1, PersonRemove, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import "./header.css"; 
import {useDispatch, useSelector} from "react-redux";
import { setUser, clearCart } from '../../store/cartSlice';
import { auth } from '../../firebase';

const Header = () => {
  const user = useSelector(state => state.cart.user);
  const dispatch = useDispatch();
  console.log(user);
  

  // useEffect(() => {
  //   auth.onAuthStateChanged(authUser => {
  //     if(authUser){
  //       console.log(authUser);
  //       setUser(authUser);
  //     }
  //     else {
  //       setUser(null);
  //     }
  //   })
  // }, [user]);

  const handleLogout = () => {
    auth.signOut();
    dispatch(setUser(null));
    dispatch(clearCart());
  }

  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  return (
    <div className="header-container">   
        <div className="header">
          <h5 className="header-title">Ecommerce</h5>
          <div className="header-links">  
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="checkbtn">
                <Menu className="menuIcon" />
            </label>
            <ul className="ulClass">
                <Link to="/"  className="links"><li>Home</li></Link>
                <Link to="/about" className="links"><li>About</li></Link>
                <Link to="/products" className="links"><li>products</li></Link>
              {(user!== null) && <Link to="/checkout" className="links"><li>checkout</li></Link>}
            </ul>
          </div>
          <div className="header-actions">
            <ul>
              <Link to="/cart" className="links"><li>
                <span>Cart</span><ShoppingCart className="header-icon"/>
                <div className="cart-value">{totalQuantity}</div>
              </li></Link>
              <li>
                {user ? <Link to="/" className="user-login">
                  <span onClick={handleLogout}>Logout</span><PersonRemove className="header-icon"/></Link>: 
                  <Link to="/login" className="user-login"> 
                    <span>Login</span><PersonAddAlt1 className="header-icon"/></Link>}
              </li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default Header;