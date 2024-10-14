import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { api } from '../../../../API/ApiClient';
import { formatPrice } from '../../../../Components/Item/Item';
import { deleteProduct } from '../../../Api/AdProductApi';

export const DatatableProduct = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/admin/product');
            const products = response.data; // Assuming this is an array of products

            // Define columns based on your data structure
            const columns = [
                { field: 'id', headerName: 'ID', width: 90 , key : 'id'},
                { field: 'name', headerName: 'Name', width: 600 },
                {
                    field: 'price',
                    headerName: 'Price',
                    width: 120,
                    valueFormatter: (params) => {
                        return formatPrice(params);
                    }
                },

                {
                    field: 'subCategory',
                    headerName: 'subCategory',
                    width: 200,

                    valueGetter: (params) => params.name
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    width: 200,
                    renderCell: (params) => (
                        <div className="cellAction">
                            <Link to={{
                                pathname: `/products/view/${params.row.id}`,
                            }} style={{ textDecoration: "none" }}>
                                <div className="viewButton">View</div>
                            </Link>
                            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                                Delete
                            </div>
                        </div>
                    )
                }
            ];

            setData(products);
            setColumns(columns);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (confirmed) {
            try {
                await deleteProduct(id);
                alert('Sản phẩm đã được xóa thành công!');
                await fetchData();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Đã xảy ra lỗi khi xóa sản phẩm.');
            }
        } 
    };

    const handleDeleteAll = async () => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn không?');
        if (confirmed) {
            try {
                alert('Tất cả sản phẩm đã được xóa thành công!');
                // await fetchData();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Đã xảy ra lỗi khi xóa sản phẩm.');
            }
        } 
    };

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Sản phẩm
               <button onClick={()=> handleDeleteAll()}> Xóa tất cả sản phẩm </button> 
                <Link to="/products/addNewProduct" className="link">
                    Thêm sản phẩm 
                </Link>
            </div>
            

            <DataGrid
                className="datagrid"
                rows={data}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}

            />
        </div>
    );
};

export default DatatableProduct;
