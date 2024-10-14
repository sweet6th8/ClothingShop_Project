import React, { createContext, useCallback, useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTotalQuantityInCart as fetchTotalQuantity } from "../API/ApiDetailCart"; // Import API function

export const CartContext = createContext(null);

const CartContextProvider = (props) => {
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Theo dõi trạng thái đăng nhập

    // lay token kiem tra nguoi dung da dang nhap chua
    const token = sessionStorage.getItem("access_token");

    const getTotalQuantityInCart = useCallback(async (isCart) => {
        console.log('isCart', isCart);
        if (!token) {
            if(isCart) {
                navigate('/login');
            }
            return;
        }
        try {
            const data = await fetchTotalQuantity();
            setQuantity(data);
        } catch (error) {
            console.error('Failed to fetch cart quantity:', error);
        }
    }, [token]);

    useEffect(() => {
       
        const checkLoginStatus = async () => {
            if (token) {
                setIsLoggedIn(true); // Đặt trạng thái đăng nhập nếu có token
                try {
                    await getTotalQuantityInCart(true);
                } catch (error) {
                    console.error('Failed to fetch cart data:', error);
                }
            }
        };
    
        checkLoginStatus();
    }, [getTotalQuantityInCart]);


    const checkLogin = ()  => {
        setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
    };

    const contextValue = { quantity, getTotalQuantityInCart ,checkLogin ,isLoggedIn ,setQuantity ,setIsLoggedIn};

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
