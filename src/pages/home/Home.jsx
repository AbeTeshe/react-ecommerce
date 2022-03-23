import React from 'react'
import FeatureProduct from '../featureProduct/FeatureProduct';
import Newsletter from '../newsletter/Newsletter';
import { Link } from 'react-router-dom';
import image from "../../images/bag.png";
import "./home.css";


const Home = ({products}) => {
  return (
    <div className="home">
        <div className="home-container">
           <div className="home-left">
              <h1>Buy Our Best Products</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
              <Link to="/products">
                 <button className="home-button">Shop Now</button>
              </Link>
           </div>
           <div className="home-right">
              <img className="home-image-big" src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg" alt="" />
              <img className="home-image-small" src={image} alt="" />
           </div>
        </div>
        <FeatureProduct products={products}/>
        <Newsletter />
    </div>
  )
}

export default Home;