import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { retrieveRandomProduct } from '../../API/ApiProduct'

const NewCollections = () => {
    const [products, setProduct]  = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await retrieveRandomProduct(8);
            setProduct(response);
        };
        fetchProduct();
      }, []); 
    

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {products.map((item, i) => {
                    return (
                        <Item key={i} id={item.id} name={item.name} new_price={item.price} image={item.pathImage} />
                    )
                })}
            </div>
        </div>
    )
}

export default NewCollections