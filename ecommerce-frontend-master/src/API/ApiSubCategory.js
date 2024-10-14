import { api } from "./ApiClient";

export const retrieveSubCategories = async () => {
    try {
        const response = await api.get('/subcategory');
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
}

