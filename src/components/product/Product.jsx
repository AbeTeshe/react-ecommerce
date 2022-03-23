import { Search } from '@mui/icons-material';

import {Link} from "react-router-dom";
import React from 'react'
import "./product.css";


const Product = ({products}) => {
  
  return (
    <>
        {products.map((product) => (
        <div  key={product?.id} className="product">
            <div className="product-image-container">
               <img className="product-img" src={product?.image} alt="prod" />
               <Link to={`/product/${product?.id}`}>
                  <div className="icon-container">
                      <Search className="search-icon"/>
                  </div>
               </Link>
            </div>
            <div className="product-desc">
                <p className="product-title">{product?.title.substring(0, 25)}</p>
                <p className="product-price">${product?.price.toFixed(2)}</p>
            </div>
    </div>))}
    </>
  )
}

export default Product;