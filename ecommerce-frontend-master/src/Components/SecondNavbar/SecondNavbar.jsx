import React, { useContext, useEffect, useState } from 'react';
import './SecondNavbar.css';
import { RxDividerVertical } from "react-icons/rx";
import { Link ,useParams } from 'react-router-dom';
import SearchBar2 from '../SearchBar/SearchBar2';
import { CartContext } from '../../Context/CartContext';
import { IoCartOutline } from "react-icons/io5";

const SecondNavbar = () => {
    const{gender} = useParams();
    const { getTotalQuantityInCart, quantity, isLoggedIn } = useContext(CartContext);
    const [menu, setMenu] = useState('shop');


    const fetchCart = async () => {
        try {
            await getTotalQuantityInCart(true);
        } catch (error) {
            console.error('Failed to fetch cart. Please try again later.');
        }
    };

    // useEffect(() => {
    //     fetchCart();
    // },[fetchCart])

    useEffect(() => {
        // Set the menu based on gender from the URL params
        if (gender === 'nam') {
            setMenu('shop');
        } else if (gender === 'nữ') {
            setMenu('womens');
        } else {
            setMenu('shop'); // Default or fallback
        }
        
        // Fetch cart data whenever the component mounts or gender changes
        // fetchCart();
    }, [gender]);

    return (
        <>
            <div className="nav-header1">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', zIndex: '3', position: 'fixed' }}>
                    <p>XUN_DON</p>
                </Link>
            </div>
            <div className="navbar1">
                <ul className='nav-menu1'>
                    <li onClick={() => setMenu('shop')}>
                        <Link to={`/product/gender/nam`} style={{ textDecoration: 'none', color: 'inherit' }}>NAM</Link>
                        {menu === 'shop' && <hr />}
                    </li>
                    <RxDividerVertical style={{ fontSize: '2rem' }} />
                    <li onClick={() => setMenu('womens')}>
                        <Link to={`/product/gender/nữ`} style={{ textDecoration: 'none', color: 'inherit' }}>NỮ</Link>
                        {menu === 'womens' && <hr />}
                    </li>
                    {/* <RxDividerVertical style={{ fontSize: '2rem' }} />
                    <li onClick={() => setMenu('kids')}>
                        <Link to={`/product/gender/trẻ em`} style={{ textDecoration: 'none', color: 'inherit' }}>TRẺ EM</Link>
                        {menu === 'kids' && <hr />}
                    </li> */}
                </ul>

                <div className="nav-login-cart">
                    <SearchBar2 />
                    <div className="cart">
                        {!isLoggedIn ? (
                            <IoCartOutline 
                                style={{ color:'black',fontSize:'2rem',cursor:'pointer' }} 
                                onClick={fetchCart} 
                            />
                        ) : (
                            <Link to='/cart'>
                                <IoCartOutline style={{ color:'black',fontSize:'2rem',cursor:'pointer' }} />
                            </Link>
                        )}
                    </div>
                    <div className="nav-cart-count">{quantity === undefined ? 0 : quantity}</div>
                </div>
            </div>
        </>
    );
};

export default SecondNavbar;
