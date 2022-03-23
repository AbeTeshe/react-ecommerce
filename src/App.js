import {useState, useEffect} from "react";
import Products from "./components/products/Products";
import Footer from "./pages/footer/Footer";
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Product from "./pages/product/Product";
import About from './pages/about/About';
import Cart from './components/cart/Cart';
import Login from './components/login/Login';
import Checkout from "./components/checkout/Checkout";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import { useSelector } from 'react-redux';

const promise = loadStripe('pk_test_51JsLJnL4ZN6qtyNcqFhgoeqjaNF789pAXWN47x1g59lfidILtJ8UXi9m0Y7lUxFp59yLIxbOktd2l9WbYgsZ3eQZ00buFYC6mi');


function App() {
  const user = useSelector(state => state.cart.user);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts =() => { 
                   setLoading(true);
                   fetch(`https://fakestoreapi.com/products/`)
                       .then((res) => res.json())
                       .then((res) => {
                         setProducts(res);
                         setLoading(false);
                       })
        }
    fetchProducts();
}, []);
  

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route exact path="*" element={<Home products={products}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products products={products} loading={loading}/>}/>
          <Route path="/product/:Pid" element={<Product />} />
          {user && <Route path="/checkout"  element={
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          }/>}
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

