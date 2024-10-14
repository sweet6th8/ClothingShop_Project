import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import '../list.css'
import DatableInventory from '../../../components/datatable/inventory/DatableInventory';

const InventoryList = () => {
  return (
    <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DatableInventory/>
          </div>
        </div>
  )
}

export default InventoryList