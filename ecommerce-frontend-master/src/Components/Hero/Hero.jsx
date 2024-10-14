import React, { useEffect, useState } from 'react';
import './Hero.css';
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom';
import { retrieveSubCategories } from '../../API/ApiSubCategory';
const Hero = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const data = await retrieveSubCategories();
        setSubCategories(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);


  return (
    <div className='hero'>
      <Navbar />
      <div className="hero-content">
        <div className="hero-left">
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              subCategories.map((subCategory, index) => (
                <Link key={index} to={`/product/subcategory/${subCategory.id}`} style={{textDecoration :"none"}}> 
                  <p >{subCategory.name.toUpperCase()} +</p>
                </Link>
              ))
            )}
          </div>
          {/* <div className="hero-latest-btn">
            <div><Link style={{ color: 'white' }} to='/login'>𝗫𝗘𝗠 𝗡𝗚𝗔𝗬</Link></div>
          </div> */}
        </div>
        {/* <div className="hero-right">
          <div className="header-right">
            <h1>SPORTS</h1>
            <h2>PREMIUM SS24</h2>
          </div>
          <div className='hero-right-content'>
            <RiDoubleQuotesL style={{ fontSize: "2rem" }} />
            <ul>SANG TRỌNG,THỂ THAO,NĂNG ĐỘNG</ul>
            <ul>TIÊU CHUẨN THỜI TRANG HIỆN ĐẠI</ul>
            <RiDoubleQuotesR style={{ fontSize: '2rem', marginLeft: "22rem" }} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Hero;

