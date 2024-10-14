import { api } from "../../API/ApiClient";

export const retrieveInvetoryByid = async(id)=>{
    try {
        const response = await api.get(`/admin/inventory/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const modifyQuantityInvetoryByid = async(id , quantity)=>{
    try {
        const response = await api.post(`/admin/inventory/edit/${id}?quantity=${quantity}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}