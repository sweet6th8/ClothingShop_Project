import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom'

const Breadcrum = (props) => {
    const { product } = props
    return (
        <div className='breadcrum'>
           <Link to='/' style={{textDecoration:"none" , color:"#5e5e5e"}}>HOME</Link>  <img src={arrow_icon} alt="" />SHOP <img src={arrow_icon} alt="" />{product.subCategoryName}<img src={arrow_icon} alt=""  />{product.name}
        </div>
    )
}

export default Breadcrum;