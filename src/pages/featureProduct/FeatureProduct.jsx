import React from 'react'
import Product from '../../components/product/Product';
import { Link } from 'react-router-dom';
import "./featureProduct.css";


const FeatureProduct = ({products}) => {
  const featuredProducts =[products[2], products[6], products[11]];
  
  return (
    <div className="featureProducts-container">
      <div className="featureProducts-wrapper">
          <h1 className="featuredProducts-title">Featured Products</h1>
          <div className="featuredProducts-underline"></div>
          <div>
            <div className="featuredProducts">
              <Product products={featuredProducts}/>
            </div>
            <div className="featured-button">
              <Link to="/products">
                <button className="featuredProducts-button">All Products</button>
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default FeatureProduct