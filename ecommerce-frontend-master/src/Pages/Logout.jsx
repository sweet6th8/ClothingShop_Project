import React, { useContext, useEffect } from 'react'
import { api } from '../API/ApiClient'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'

const Logout = () => {
    const{setQuantity ,setIsLoggedIn} = useContext(CartContext);
    const navigation = useNavigate();

    const logout = async () => {
        try {
             await api.post('/auth/logout');
             setQuantity(undefined);
             setIsLoggedIn(false);
            alert('Logged out successfully');
            navigation('/');
            
        } catch (err) {
            {
                alert('Logged out failed'); 
            }
        }
    }

    useEffect(()=>{
        logout();
    },[logout]);

    return (
        <div></div>
    )
}

export default Logout