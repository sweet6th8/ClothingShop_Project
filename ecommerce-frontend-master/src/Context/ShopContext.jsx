// src/Context/ShopContext.jsx
import React, { createContext, useState, useCallback } from "react";
import { retrieveProductBySubCategory, retrieveProductByGender, retrieveProductBySearch } from "../API/ApiProduct";
import { getCartDetail } from "../API/ApiDetailCart";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const [paginationData, setPaginationData] = useState({
        totalPages: 0,
        totalElements: 0,
        size: 0,
    });



    const fetchProductsBySubCategory = useCallback(async (categoryId, page) => {
        setLoading(true);
        setError(null);
        try {
            const index = page - 1;
            const data = await retrieveProductBySubCategory(categoryId, index);
            setProducts(data.content);
            setPaginationData({
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                size: data.size,
            });
        } catch (error) {
            console.error('Error fetching products by category:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);




    const fetchProductsByGender = useCallback(async (gender, page) => {
        setLoading(true);
        setError(null);
        try {
            const index = page - 1;
            const data = await retrieveProductByGender(gender, index);
            setProducts(data.content);
            setPaginationData({
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                size: data.size,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products by gender:', error);
            setError(error);
            setLoading(false);
        }
    }, []);


    const fetchProductBySearch = useCallback(async (search, page) => {
        setLoading(true);
        setError(null);
        try {
            const index = page - 1;
            const data = await retrieveProductBySearch(search, index);
            setProducts(data.content);
            setPaginationData({
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                size: data.size,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products by gender:', error);
            setError(error);
            setLoading(false);
        }
    }, []);


    const fetchDetailProductInCart = useCallback(async (page) => {
        setLoading(true);
        setError(null);
        try {
            const index = page - 1;
            const data = await getCartDetail(index);
            
            if (data.content.length === 0) {
                setProducts([]);
            } else {
                setProducts(data.content);
            }
            
            setPaginationData({
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                size: data.size,
            });
        } catch (error) {
            console.error('Error fetching cart details:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);
    

    const contextValue = { products, loading, error, fetchProductsBySubCategory, fetchProductsByGender, paginationData, fetchProductBySearch, fetchDetailProductInCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
