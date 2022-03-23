import React, {useState, useEffect} from 'react';
import { Grade, Add, Remove } from '@mui/icons-material';
import "./product.css";
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cartSlice';
import Loading from "../loading/Loading";
import img1 from "../../images/shop1.jpg";
import img2 from "../../images/shop2.jpg";
import img3 from "../../images/shop3.jpg";
import img4 from "../../images/shop4.jpg";


const Product = () => {
    const {Pid}= useParams();
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const images = [product.image, img1, img2, img3, img4];
    
    useEffect(() => {
      const fetchProduct =() => { 
                     setLoading(true);
                     fetch(`https://fakestoreapi.com/products/${Pid}`)
                         .then((res) => res.json())
                         .then((res) => {
                           setProduct(res);
                           setLoading(false);
                         })
          }
      fetchProduct();
  }, [Pid]);

  const { title, price, image, id} = product;

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id,
        price,
        image,
        quantity,
        title,
      })
    )
  }

  return (
    <>
        {loading ? <Loading /> :
        <div className="single-product">
        <Link to="/products">
            <button className="single-product-button">Back to Products</button>
        </Link>
        <div className="single-product-container">
            <div className="single-product-images">
                <img src={images[index]} alt="prod" className="single-product-image"/>
                <div className="product-other-images">
                    <img src={product.image} onClick={() => setIndex(0)} alt="prod" className="single-product-img"/>
                    <img src={img1} onClick={() => setIndex(1)} alt="prod" className="single-product-img"/>
                    <img src={img2} onClick={() => setIndex(2)} alt="prod" className="single-product-img"/>
                    <img src={img3} onClick={() => setIndex(3)} alt="prod" className="single-product-img"/>
                    <img src={img4} onClick={() => setIndex(4)} alt="prod" className="single-product-img"/>
                </div>
            </div>
            <div className="single-product-detail">
                <h1 className="single-product-title">{product.title?.substring(0, 20)}</h1>
                <p className="single-product-rating">
                {Array(4).fill().map((_, i) => (
                  <Grade className="rating" key={i}/>
                ))} ({product.rating?.count} customer reviews)
                </p>
                <p className="single-product-price">${product.price?.toFixed(2)}</p>
                <p className="single-product-desc">{product.description}</p>
                <div className="single-product-info">
                    <h4>Available:</h4>
                    <p>InStock</p>
                </div>
                <div className="single-product-info">
                    <h4>SKU:</h4>
                    <p>RecF0KpwlkF7e8kXO</p>
                </div>
                <div className="single-product-info">
                    <h4>Brand:</h4>
                    <p>Brand Name</p>
                </div>
                <hr className="single-product-hr"/>
                <div className="product-quantity-action">
                    <Remove onClick = {() => setQuantity(quantity < 2 ? quantity : quantity - 1)} />
                    <p className="quantity">{quantity}</p>
                    <Add onClick = {() => setQuantity( quantity > 9 ? quantity : quantity + 1)} />
                </div>
                <button className="addToCart-button" onClick={addToCartHandler}>Add to cart</button>
            </div>
        </div>
        </div>}
    </>
  )
}

export default Product;