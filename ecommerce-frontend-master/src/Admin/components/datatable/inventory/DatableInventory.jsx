import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { api } from '../../../../API/ApiClient';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { retrieveInvetoryByid } from '../../../Api/AdInventory';



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

export const DatableInventory = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [open, setOpen] = useState(false);
    const [inventoryDetails, setInventoryDetails] = useState([]);
    const [image, setImage] = useState();
    const [inventoryId , setInventoryId] = useState();

    const navigation = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/admin/inventory');
            const products = response.data; // Assuming this is an array of products

            const columns = [
                { field: 'id', headerName: 'ID', width: 90 },
                {
                    field: 'product', headerName: 'Name', width: 500,
                    valueGetter: (params) => (params.name)
                },
                {
                    field: 'size', headerName: 'Size', width: 100,
                    valueGetter: (params) => (params.size.toUpperCase())
                },
                {
                    field: 'quantity', headerName: 'Quantity', width: 100,
                    valueGetter: (params) => params
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    width: 200,
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
                await api.delete(`/admin/inventory/delete/${id}`);
                alert('Sản phẩm đã được xóa thành công!');
                await fetchData();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Đã xảy ra lỗi khi xóa sản phẩm.');
            }
        }
    };

    const handleOpen = async (inventoryId) => {
        try {
            const response = await retrieveInvetoryByid(inventoryId);
            setInventoryDetails([response])
            setImage(response.product.pathImage);
            setInventoryId(inventoryId);
            setOpen(true);
        } catch (error) {

        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
    navigation( `/inventory/edit/${inventoryId}`);   
    };

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Kho hàng
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

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Chi tiết kho hàng
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box sx={{ marginRight: 2 }}>
                            <img src={image} style={{ maxWidth: 200, maxHeight: 200 }} />
                        </Box>
                        <TableContainer component={Paper} sx={{ flex: 1 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên sản phẩm</TableCell>
                                        <TableCell>Danh mục</TableCell>
                                        <TableCell>Kích thước</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inventoryDetails.map((inventory, index) => (

                                        <TableRow key={index}>
                                            <TableCell>{inventory.product.name}</TableCell>
                                            <TableCell>{inventory.product.subCategory.name}</TableCell>
                                            <TableCell style={{ textTransform: 'uppercase' }}>{inventory.size.size}</TableCell>
                                            <TableCell>{inventory.quantity}</TableCell>
                                        </TableRow>

                                    ))}
                                    <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }} style={{
                                        position: 'absolute',
                                        right: '45%'
                                    }}>
                                        Edit
                                    </Button>
                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
export default DatableInventory