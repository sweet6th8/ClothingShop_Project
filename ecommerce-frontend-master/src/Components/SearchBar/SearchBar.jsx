import React, { useContext, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { CartContext } from '../../Context/CartContext';


const SearchBar = () => {
  const { isLoggedIn } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Trigger navigation to search results
      navigate(`/catalogsearch/result/${search}`);
      setSearch(''); // Clear the input value after navigation
    }
  };

  const handleUserClick = () => {
    setShowButtons(!showButtons);
  };

  const handleLoginClick = () => {
    navigate('/login', { state: { formType: 'login' } });
  }

  const handleSignupClick = () => {
    navigate('/login', { state: { formType: 'signup' } });
  };

  const handLogoutClick = () => {
    navigate('/logout')
  }


  return (
    <>
      <div className="search-bar"
        style={{
          margin: "0.5px",
          border: "none",
          borderBottom: "2px solid white",
          outline: "none",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: 'center',
        }}
      >
        <CiSearch style={{ fontSize: "1.3rem", color: 'white' }} />
        <input
          type="text"
          placeholder="Tìm kiếm "
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ background: 'transparent', outline: 'none', border: 'none', color: 'white' }}

        />
      </div>
      <div className="user">
        <CiUser
          onClick={handleUserClick}
          style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }}
        />
        {showButtons && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            right: '1rem',
            marginTop: '1rem',
            color: 'black',
            position: 'absolute',
            fontWeight: 700,
            lineHeight: '20px',
            padding: '9px 10px 9px 12px',
            border: '1px solid #000',
            background: '#fff',
            boxShadow: '0px 6px 4px rgba(179, 179, 179, .25)',
            width: '60%'
          }}>
            {!isLoggedIn ? (
              <>
                <button
                  style={{
                    color: "white",
                    borderRadius: '1px',
                    width: '100%',
                    height: '40px',
                    marginBottom: '0.5rem',
                    fontSize: '15px',
                    backgroundColor: 'black'
                  }}
                  onClick={handleLoginClick}
                >
                  Đăng nhập
                </button>
                <button
                  style={{
                    color: "black",
                    borderRadius: '1px',
                    width: '100%',
                    height: '40px',
                    fontSize: '15px'
                  }}
                  onClick={handleSignupClick}
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <button
                style={{
                  color: "black",
                  borderRadius: '1px',
                  width: '100%',
                  height: '40px',
                  fontSize: '15px'
                }}
                onClick={handLogoutClick}
              >
                Đăng xuất
              </button>
            )}
          </div>
        )}
      </div>

      <div className="heart">
        <IoIosHeartEmpty style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }} />
      </div>
      {/* <div className="cart">
          <IoCartOutline style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }} onClick={() => fetchCart()} />
      </div> */}
    </>
  );
};

export default SearchBar;
