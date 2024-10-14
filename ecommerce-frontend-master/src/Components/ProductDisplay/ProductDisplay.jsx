import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { formatPrice } from '../Item/Item';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { addToCartDetail } from '../../API/ApiDetailCart';
import { CartContext } from '../../Context/CartContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const{getTotalQuantityInCart} = useContext(CartContext)

    // Lấy ra số lượng của từng size có trong kho hàng của sản phẩm
    const { sizeQuantities } = product;
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    if (!product) {
        return <div>No product data available</div>;
    }

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Giữ số lượng không nhỏ hơn 1
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // Tăng số lượng
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra xem size đã được chọn chưa
        if (selectedSize === null) {
            alert('Vui lòng chọn size');
            return;
        }
        // Kiểm tra xem token có tồn tại không
        const token = sessionStorage.getItem('access_token');
        console.log('token', token);
        if (!token) {
            // Lưu lại vị trí hiện tại và chuyển hướng đến trang đăng nhập
            navigate('/login', { state: { from: location } });
        } else {
            if (sizeQuantities[selectedSize] < quantity) {
                alert('Số lượng sản phẩm không đủ');
            } else {
                try{
                    await addToCartDetail(product,  Number(quantity) , selectedSize);
                    alert('Đã thêm sản phẩm vào giỏ hàng');
                    await getTotalQuantityInCart();
                }catch{
                    alert('Số lượng sản phẩm không còn đủ');
                }
                    
            }
        }
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.pathImage} alt="product" />
                    <img src={product.pathImage} alt="product" />
                    <img src={product.pathImage} alt="product" />
                    <img src={product.pathImage} alt="product" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.pathImage} alt="product" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_dull_icon} alt="dull star icon" />
                    <p>122</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">{formatPrice(product.price)}</div>
                </div>
                <div className="productdisplay-right-size">
                    <h1>Chọn size: {selectedSize ? selectedSize.toUpperCase() : ''}</h1>
                    <div className="productdisplay-right-sizes">
                        {['s', 'm', 'l', 'xl', 'xxl'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${product.sizeQuantities[size] > 0 ? '' : 'size-unavailable'} ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => product.sizeQuantities[size] > 0 && handleSizeClick(size)}
                            >
                                {size.toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>
                <p className='productdisplay-selected-quantity'>
                    Chọn số lượng: {quantity}
                </p>
                <div className='product-options-bottom'>
                    <div className="buy-amount">
                        <button onClick={handleDecrement}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                        <input type="text" name="amount" id="amount" value={quantity} readOnly />
                        <button onClick={handleIncrement}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                    <button type='button' title='THÊM VÀO GIỎ HÀNG' className='addToCart' onClick={handleOnSubmit}>
                        <span>THÊM VÀO GIỎ HÀNG</span>
                    </button>
                </div>
                {selectedSize && (
                    <p className='productdisplay-selected-size'>
                        Còn lại: {product.sizeQuantities[selectedSize]} sản phẩm
                    </p>
                )}
            </div>
        </div>
    );
}

export default ProductDisplay;
