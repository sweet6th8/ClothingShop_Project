import React, { useState, useEffect } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item.jsx';
import { retrieveRandomProduct } from '../../API/ApiProduct.js';

const RelatedProducts = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
        const response = await retrieveRandomProduct(5);
        setProduct(response);
    };
    fetchProduct();
  }, []); 


  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {products.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            new_price={item.price}
            image={item.pathImage}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
