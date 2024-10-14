import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import DatatableProduct from '../../../components/datatable/product/DatatableProduct'
import Navbar from '../../../components/navbar/Navbar';
import '../list.css'

const ProductList = () => {
  return (
    <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DatatableProduct/>
          </div>
        </div>
  )
}

export default ProductList