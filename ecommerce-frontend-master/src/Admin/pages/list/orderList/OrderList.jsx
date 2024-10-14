import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import DatatableOrder from '../../../components/datatable/order/DatableOrder'
import '../list.css'

const OrderList = () => {
    return (
        <div className="list">
              <Sidebar/>
              <div className="listContainer">
                <Navbar/>
                <DatatableOrder/>
              </div>
            </div>
      )
}

export default OrderList;