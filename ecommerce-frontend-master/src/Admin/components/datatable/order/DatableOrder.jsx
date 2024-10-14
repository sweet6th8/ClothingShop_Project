import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { api } from '../../../../API/ApiClient';
import { formatPrice } from '../../../../Components/Item/Item';
import { deleteProduct } from '../../../Api/AdProductApi';
import {Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getDetailOrderByOrderId } from '../../../Api/AdDetailOrder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const DatableOrder = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [open, setOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/admin/order');
            const products = response.data;

            const columns = [
                { field: 'id', headerName: 'ID', width: 90 },
                {
                    field: 'user', headerName: 'UserName', width: 150,
                    valueGetter: (params) => params.username 
                },
                { field: 'date', headerName: 'Date', width: 300 },
                {
                    field: 'totalCost', headerName: 'Price', width: 150,
                    valueFormatter: (params) => formatPrice(params) 
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    width: 300,
                    renderCell: (params) => (
                        <div className="cellAction">
                            <div className="viewButton" onClick={() => handleOpen(params.row.id)}>
                                View
                            </div>
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
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpen = async (orderId) => {
        try {
            const response = await getDetailOrderByOrderId(orderId);
            console.log(response);
            setOrderDetails(response);
            setOpen(true);
        } catch (error) {
            
        }
       
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?');
        if (confirmed) {
            try {
                await deleteProduct(id);
                alert('Đơn hàng đã được xóa thành công!');
                await fetchData();
            } catch (error) {
                alert('Đã xảy ra lỗi khi xóa đơn hàng.');
            }
        } 
    };

   

    return (
        <div className="datatable">
            <div className="datatableTitle">
                    Đơn hàng
               
            </div>

            <DataGrid
                className="datagrid"
                rows={data}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                  <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Chi tiết đơn hàng
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead >
                                <TableRow >
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Danh mục con</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Kích thước</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetails.map((detail, index) => (
                                    <TableRow key={index} >
                                        <TableCell>{detail.product.name}</TableCell>
                                        <TableCell>{formatPrice(detail.product.price)}</TableCell>
                                        <TableCell>{detail.product.subCategory.name}</TableCell>
                                        <TableCell>{detail.quantity}</TableCell>
                                        <TableCell style={{textTransform:'uppercase '}}>{detail.size.size}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </div>
    );
};

export default DatableOrder;