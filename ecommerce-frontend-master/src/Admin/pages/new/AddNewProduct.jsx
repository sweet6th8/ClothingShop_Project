import React, { useState, useEffect } from 'react'
import { retrieveSubCategories } from '../../../API/ApiSubCategory';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { api } from '../../../API/ApiClient';
import { addProduct } from '../../Api/AdProductApi';

const AddNewProduct = ({ title }) => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        pathImage: '',
        subCategoryName: '',
        size: '',
        quantity: ''
    });
    const [subCategories, setSubCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [filteredSizes, setFilteredSizes] = useState([]);
    const [file, setFile] = useState(null);
    const [subCategorySelected, setSubCategorySelected] = useState(false);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await retrieveSubCategories();
                setSubCategories(response);
                if (response.length > 0) {
                    // Set the default subCategoryName to the first item
                    setProductData(prevState => ({
                        ...prevState,
                        subCategoryName: response[0].name
                    }));
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin danh mục phụ:", error);
            }
        };
        fetchSubCategories();
    }, []);
    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await api.get('size');
                setSizes(response.data);
                setFilteredSizes(response.data); // Initialize filtered sizes
            } catch (error) {
                console.error("Lỗi khi lấy thông tin size:", error);
            }
        }
        fetchSizes();
    }, []);

    useEffect(() => {
        if (productData.subCategoryName.toLowerCase().includes('áo')) {
            setFilteredSizes(sizes.filter(size => size.type === 'áo'));
        } else {
            setFilteredSizes(sizes.filter(size => size.type === 'quần'));
        }
    }, [productData.subCategoryName]);

    const handleNameChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            name: e.target.value
        }));
    }

    const handlePriceChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            price: e.target.value
        }));
    }

    const handlePathImageChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            pathImage: e.target.value
        }));
        setFile(e.target.value);
    }

    const handleSelectChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            subCategoryName: e.target.value
        }));
        setSubCategorySelected(true);
    }

    const handleSizeChange = (e) => {
        if (!subCategorySelected) {
            alert('Vui lòng chọn danh mục phụ trước khi chọn size.');
            return;
        }
        setProductData(prevState => ({
            ...prevState,
            size: e.target.value
        }));
    }

    const handleSubmit = async () => {
        const { name, price, pathImage, subCategoryName, size, quantity } = productData;
        if (!name || !price || !pathImage || !subCategoryName || !size || !quantity) {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
            return;
        }else if(price<0){
            alert('Giá sản phẩm không được âm.');
            return; 
        }else if(quantity<0){
            alert('Số lượng sản phẩm không được âm.');
            return; 
        }

     try {
        await addProduct(productData)  ;
        alert("Sản phẩm đã được thêm thành công!");
     } catch (error) {
        alert("Lỗi khi thêm sản phẩm!");
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
                            src={file || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt="Hình ảnh sản phẩm"
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="name">Tên</label>
                                <input
                                    type="text"
                                    value={productData.name}
                                    onChange={handleNameChange}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="price">Giá</label>
                                <input
                                    type="number"
                                    value={productData.price}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="subCategory">Danh mục phụ</label>
                                <select
                                    id="subCategory"
                                    value={productData.subCategoryName}
                                    onChange={handleSelectChange}
                                >
                                    {subCategories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="formInput">
                                <label htmlFor="size">Size</label>
                                <select
                                    id="size"
                                    value={productData.size}
                                    onChange={handleSizeChange}
                                >
                                    <option value="">Chọn size</option>
                                    {filteredSizes.map((size) => (
                                        <option key={size.id} value={size.size} style={{ textTransform: 'uppercase' }}>
                                            {size.size}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="formInput">
                                <label htmlFor="imageUrl">URL Hình ảnh</label>
                                <input
                                    type="text"
                                    value={productData.pathImage}
                                    onChange={handlePathImageChange}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="quantity">Số lượng</label>
                                <input
                                    id='quantity'
                                    type="number"
                                    value={productData.quantity}
                                    onChange={(e) => setProductData(prevState => ({
                                        ...prevState,
                                        quantity: e.target.value
                                    }))}
                                />
                            </div>
                        </form>
                        <div className="button">
                            <button type="button" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
