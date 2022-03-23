import React from 'react'
import "./productDetail.css";
import {Link} from "react-router-dom";

const ProductDetail = ({products}) => {
  return (
    <div className="productDetail">
        {products.map((product) => (
            <div className='productDetail-container'>
                <img  src={product.image} alt="prd" className="productDetail-image"/>
                <div className="productDetail-desc">
                    <h1 className="productDetail-title">{product.title?.substring(0, 25)}</h1>
                    <p className="productDetail-price">${product.price}</p>
                    <p className="productDetail-description">{product.description?.substring(0, 150)}...</p>
                    <Link to={`/product/${product?.id}`}><button className="productDetail-button">Details</button></Link>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ProductDetail