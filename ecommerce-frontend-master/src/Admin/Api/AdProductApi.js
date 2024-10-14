import { api } from "../../API/ApiClient";

export const modifyProduct = async(productData)=>{
    try {
        const response = await api.post("/admin/product/edit" ,productData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const addProduct = async(productData)=>{
    try {
        const response = await api.post("/admin/product/add" ,productData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteProduct = async(id)=>{
    try {
        const response = await api.delete(`/admin/product/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}