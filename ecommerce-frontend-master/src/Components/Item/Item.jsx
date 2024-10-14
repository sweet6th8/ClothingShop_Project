import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return 'Invalid price'; // or handle it in a way suitable for your app
    }
    return numericPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

const Item = (props) => {
   
    return (
        <div className='shop-item'>
          <Link to = {`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""   style={{ width: '100%' }}  /></Link>  
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                {formatPrice(props.new_price)} 
                </div>
            </div>
        </div>
    )
}

export default Item ;