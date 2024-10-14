import { api } from "./ApiClient";

// Thêm interceptor để thêm token JWT vào headers của mỗi yêu cầu
api.interceptors.request.use( async function (config) {
    // Lấy access token từ sessionStorage
    const token = sessionStorage.getItem("access_token");

    // Người dùng chưa đăng nhâp, không có token
    if (!token) {
        console.log("config", config)
        return config;
    }

    const newHeaders = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
  
      // Đính header mới vào lại request trước khi được gửi đi
      config = {
        ...config,
        headers: newHeaders,
      };
  

    return config;
}, function (error) {
    // Xử lý lỗi trước khi yêu cầu được gửi đi
    return Promise.reject(error);
});


// // Thêm interceptor để xử lý các lỗi response
// api.interceptors.response.use( async function (response) {
//     if(response.status === 401){
//         console.log('response', response);
//     }
//     console.log('response', response);
//     return response;
// }, async function (error) {
//     console.error('error', error);
//     // const originalRequest = error.url;
//     // const originalMethod = error.method;
//     // console.log('originalRequest', originalRequest);
//     if ((error.response.status === 401 || error.status === 403)) {
//         // try {
//             // Gọi API /jwt/refresh để lấy access token mới
//             const response = await api.get('/jwt/refresh');

//         }
//     //         console.log('response', response);

//     //         // Cập nhật access token trong sessionStorage
//     //         sessionStorage.setItem("access_token", response.data.access_token);

//     //         // Thực hiện lại yêu cầu ban đầu với access token mới
//     //         // originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
//     //         // return api.originalMethod.originalRequest;
//     //     } catch (refreshError) {
//     //         // Nếu refresh token hết hạn, điều hướng người dùng tới trang đăng nhập
//     //         window.location.href = '/login';
//     //         return Promise.reject(refreshError);
//     //     }
//     // }
//     return Promise.reject(error);
// });


// function decodeJWT(token) {
//     try {
//         const base64Url = token.split('.')[1]; // Lấy phần payload
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Chuyển đổi từ Base64URL sang Base64
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         return JSON.parse(jsonPayload); // Chuyển đổi thành đối tượng JSON
//     } catch (e) {
//         console.error("Invalid token");
//         return null;
//     }
// }

// function isTokenExpired(token) {
//     const payload = decodeJWT(token); // Giải mã token để lấy payload
//     if (!payload) return true; // Nếu không giải mã được token, coi như token đã hết hạn
//     const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại theo giây
//     console.log('payload', payload.exp);
//     console.log('payload', payload);
//     console.log('currentTime', currentTime);
//     return payload.exp < currentTime; // So sánh với thời gian hết hạn trong token
// }