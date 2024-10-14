import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { api } from '../../API/ApiClient';

const ProtectedRoute = ({  }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                  await api.get('/admin/product'); // Gọi API để kiểm tra quyền truy cập
                setIsAuthorized(true);
            } catch (error) {
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthorization();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Hiển thị khi đang kiểm tra quyền truy cập
    }

  

    if (isAuthorized === false) {
        return <Navigate to="/login" />; // Chuyển hướng đến trang đăng nhập nếu không được phép
    }

    return <Outlet />; // Hiển thị nội dung của trang nếu đã được phép
};

export default ProtectedRoute;
