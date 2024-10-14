import axios from "axios";

// Tạo một instance của Axios với cấu hình cơ bản
export const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
});




// Hàm đăng ký người dùng
export const registerUser = async (username, email, password) => {
    try {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    } catch (error) {
        console.error('Can not register', error);
        throw error;
    }
}

// Hàm đăng nhập người dùng
export const loginUser = async (emailOrUserName, password) => {
    try {
        const response = await api.post('/auth/login', { emailOrUserName, password })
        sessionStorage.setItem("access_token", response.data.jwt);
        console.log('loginUser', response.data);
        return response.data;
    } catch (error) {
        console.log('Can not login', error);
        throw error;
    }
}

// export const checkAuth = async () => {
//     try {
//         const response = await api.get('/auth/check');
//         return response.data;
//     } catch (error) {
//         console.log('Cannot check authentication', error);
//         // throw error;
//     }
// };


