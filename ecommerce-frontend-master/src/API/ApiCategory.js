import { api } from "./ApiClient";

export  const retrieveCategories = async () => {
    try{
        const response = await api.get('/category');
        return response.data;
    }catch {
        console.error('Error fetching categories:', error);
        throw error;
    }
}