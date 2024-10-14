import { api } from "../../API/ApiClient";

export const getDetailOrderByOrderId = async (orderId) => {
    try {
        const response = await api.get(`/admin/orderDetail/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error can not get order details by orderId: ', orderId  );
        throw error;
    }
}