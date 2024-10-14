import { api } from "../../API/ApiClient";

export const  loginAdmin = async (username , password) =>{
    try{
        const response = await api.post('/admin/login', { username, password });
        return response.data;
        
    }catch(error){
        console.log('Can not login', error);
        throw error;
    }
}