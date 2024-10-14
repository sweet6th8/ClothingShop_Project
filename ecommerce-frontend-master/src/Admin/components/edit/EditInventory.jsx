import React from 'react';
import { modifyQuantityInvetoryByid, retrieveInvetoryByid } from '../../Api/AdInventory';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditInventory = ({ title }) => {
    const { inventoryId } = useParams();
    const [productData, setProductData] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchInvetoryById = async () => {
            try {
                const response = await retrieveInvetoryByid(inventoryId);
                setProductData({
                    id: inventoryId,
                    name: response.product.name,
                    subCategory: response.product.subCategory.name,
                    pathImage: response.product.pathImage,
                    size: response.size.size,
                    quantity: response.quantity
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sản phẩm:", error);
            }
        };

        fetchInvetoryById();
    }, [inventoryId]);

    if (!productData) return <div>Đang tải...</div>;

    const handleClickInput = () => {
        alert("Bạn chỉ được chỉnh sửa số lượng sản phẩm trong kho hàng của bạn");
    }

    const handleQuantityChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            quantity: e.target.value
        }));
    }

    const handleSubmitEdit = async () => {
        if (productData.quantity < 0) {
            alert("Số lượng sản phẩm không được nhỏ hơn 0");
        } else {
            try {
                await modifyQuantityInvetoryByid(productData.id, productData.quantity); 
                alert("Số lượng đã được chỉnh sửa thành công!");
                navigation("/inventory");
            } catch (error) {
                alert("Lỗi khi chỉnh sửa số lượng!");
            }
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={productData.pathImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt={productData.name || "Hình ảnh sản phẩm"}
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="name">Tên</label>
                                <input
                                    type="text"
                                    value={productData.name}
                                    onClick={() => handleClickInput()}
                                    readOnly
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="subCategory">Danh mục phụ</label>
                                <input
                                    type="text"
                                    value={productData.subCategory}
                                    onClick={() => handleClickInput()}
                                    readOnly
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="size">Size</label>
                                <input
                                    type="text"
                                    value={productData.size}
                                    onClick={() => handleClickInput()}
                                    style={{ textTransform: "uppercase" }}
                                    readOnly
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="quantity">Số lượng</label>
                                <input
                                    type="number"
                                    value={productData.quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                        </form>
                        <div className="button">
                            <button type="button" onClick={handleSubmitEdit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInventory;
