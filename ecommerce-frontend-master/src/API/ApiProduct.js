
import { api } from "./ApiClient";

export const retrieveProducts = async () => {
    try {
        const response = await api.get('/product');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const retrieveProductById = async (id) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

export const retrieveProductBySubCategory = async (id, index) => {
    try {
        const response = await api.get(`/product/subcategory?id=${id}&index=${index}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
        throw error;
    }
};


export const retrieveProductByGender = async (gender, index) => {
    try {
        const response = await api.get(`/product/gender/${gender}?index=${index}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
        throw error;
    }
};

export const retrieveProductBySearch = async (search, index) => {
    try {
        const response = await api.get(`/catalogsearch/result?search=${search}&index=${index}`)
        return response.data;
    } catch (error) {
        console.error('Không tìm thấy sản phẩm:', error);
        throw error;
    }
}

// lay random san pham
export const retrieveRandomProduct = async (quantity) => {
    try {
        const response = await api.get(`/product/random/${quantity}`);
        return response.data;
    } catch (error) {
        console.error('Không lấy được sản phẩm', error);
        throw error;
    }
}

