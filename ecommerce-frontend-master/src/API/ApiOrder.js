import { api } from "./ApiClient";

export const createOrderForAllProductsInDetailCart = async (totalPrice) => {
        const response = await api.post(`order/${totalPrice}`)
        return response;
   
} 

export const createOrderForSomeProductsInDetailCart  = async(totalPrice , productListSelected)=>{
        const response = await api.post(`order/some/${totalPrice}` , productListSelected)
        return response;

} 