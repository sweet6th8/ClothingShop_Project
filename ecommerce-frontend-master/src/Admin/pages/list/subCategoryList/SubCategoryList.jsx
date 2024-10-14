import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import '../list.css'
import DatableSubCategory from '../../../components/datatable/subCategory/DatableSubCategory';

const SubCategoryList = () => {
    return (
        <div className="list">
              <Sidebar/>
              <div className="listContainer">
                <Navbar/>
                <DatableSubCategory/>
              </div>
            </div>
      )
    }

export default SubCategoryList