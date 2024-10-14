import React, { useContext, useEffect, useState } from 'react';
import './CartItem.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';
import { formatPrice } from '../Item/Item';
import SecondNavbar from '../SecondNavbar/SecondNavbar';
import PaginationRounded from '../Pagination/PaginationRounded';
import { updateQuantityInDetailCart } from '../../API/ApiDetailCart';
import { CartContext } from '../../Context/CartContext';
import { createOrderForAllProductsInDetailCart, createOrderForSomeProductsInDetailCart } from '../../API/ApiOrder';
import { HttpStatusCode } from 'axios';

const CartItems = () => {
    const { getTotalQuantityInCart } = useContext(CartContext);
    const { products = [], fetchDetailProductInCart, paginationData } = useContext(ShopContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]); // Change to array of objects
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchDetailProductInCart(currentPage);
    }, [fetchDetailProductInCart, currentPage]);

    useEffect(() => {
        if (selectAll) {
            setSelectedProducts(products.map(product => ({
                ...product,
                selected: true
            })));
        } else {
            setSelectedProducts([]);
        }
    }, [selectAll, products]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = products.reduce((acc, product) => {
                const isSelected = selectedProducts.some(selectedProduct =>
                    selectedProduct.name === product.name && selectedProduct.size === product.size
                );
                if (isSelected) {
                    return acc + product.price * product.quantity;
                }
                return acc;
            }, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [selectedProducts, products]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleQuantityChange = async (productName, quantity, size) => {
        setLoading(true);
        try {
            await updateQuantityInDetailCart(productName, quantity, size);
            await fetchDetailProductInCart(currentPage);
            await getTotalQuantityInCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (product) => {
        setSelectedProducts(prevSelected => {
            const isAlreadySelected = prevSelected.some(selectedProduct =>
                selectedProduct.name === product.name && selectedProduct.size === product.size
            );

            if (isAlreadySelected) {
                return prevSelected.filter(selectedProduct =>
                    !(selectedProduct.name === product.name && selectedProduct.size === product.size)
                );
            } else {
                return [...prevSelected, product];
            }
        });
    };

    const handleSelectAllChange = () => {
        setSelectAll(prevSelectAll => !prevSelectAll);
    };

    const handleRemoveProduct = async (productName, size) => {
        await handleQuantityChange(productName, 0, size); // Set quantity to 0
    };

    const handleSubmitOrder = async () => {
        if (selectedProducts.length > 0) {
            setLoading(true); // Hiển thị trạng thái đang tải
    
            try {
                let response;
    
                if (selectAll) {
                    response = await createOrderForAllProductsInDetailCart(totalPrice);
                } else {
                    const orderItems = selectedProducts.map(product => ({
                        name: product.name,
                        size: product.size,
                        quantity: product.quantity,
                        price: product.price,
                    }));
                    response = await createOrderForSomeProductsInDetailCart(totalPrice, orderItems);
                }
    
                console.log('Response:', response);
                if (response.status === 201) {
                    // Đặt hàng thành công
                    console.log('Order placed successfully');
                    await fetchDetailProductInCart(currentPage);
                    await getTotalQuantityInCart();
                    alert('Đặt hàng thành công');
                }
            } catch (error) {
                if (error.response) {
                    // Xử lý lỗi có phản hồi từ máy chủ
                    const { status, data } = error.response;
                    
                    console.log('Error Status:', status);
                    
                    let errorMessage = 'Đặt hàng thất bại: ';
    
                    if (status === 400 || status === 422) {
                        // Lỗi 400 hoặc 422 từ máy chủ
                        if (typeof data === 'string') {
                            // Nếu dữ liệu lỗi là chuỗi
                            errorMessage += 'Không đủ số lượng trong kho hàng cho sản phẩm: ' + data;
                        } else if (Array.isArray(data)) {
                            // Nếu dữ liệu lỗi là mảng
                            errorMessage += 'Không đủ số lượng trong kho hàng cho sản phẩm: ' + data.join(', ');
                        } else {
                            // Xử lý lỗi khác
                            errorMessage += 'Không đủ số lượng trong kho hàng cho sản phẩm: ' + JSON.stringify(data);
                        }
                    }
    
                    console.log('Error Response:', errorMessage);
                    alert(errorMessage);
                } else {
                    // Xử lý lỗi không có phản hồi từ máy chủ
                    console.error('Error placing order:', error);
                    alert('Đặt hàng thất bại');
                }
            } finally {
                setLoading(false); // Ẩn trạng thái đang tải
                setSelectedProducts([]); // Xóa danh sách sản phẩm đã chọn sau khi đặt hàng
                setTotalPrice(0); // Reset tổng giá tiền
            }
        } else {
            alert('Vui lòng chọn ít nhất một sản phẩm để đặt hàng');
        }
    }
    
    




    return (
        <>
            <SecondNavbar />
            <div className='cartitems'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                />
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map((product, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.some(selectedProduct =>
                                            selectedProduct.name === product.name && selectedProduct.size === product.size
                                        )}
                                        onChange={() => handleCheckboxChange(product)}
                                    />
                                </td>
                                <td><img src={product.pathImage} alt="" className='carticon-product-icon' /></td>
                                <td>{product.name}</td>
                                <td style={{ textTransform: 'uppercase' }}>{product.size}</td>
                                <td>{formatPrice(product.price)}</td>
                                <td>
                                    <div className="buy-amount">
                                        <button onClick={() => handleQuantityChange(product.name, product.quantity - 1, product.size)} disabled={loading}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>
                                        </button>
                                        <input type="text" name="amount" id="amount" value={product.quantity || 0} readOnly />
                                        <button onClick={() => handleQuantityChange(product.name, product.quantity + 1, product.size)} disabled={loading}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td>{formatPrice(product.price * product.quantity)}</td>
                                <td>
                                    <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={() => handleRemoveProduct(product.name, product.size)} />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8">No products in cart</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>{formatPrice(totalPrice)}</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <p>Shipping free</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>{formatPrice(totalPrice)}</h3>
                            </div>
                        </div>
                        <button onClick={() => handleSubmitOrder(totalPrice)}>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cartitems-promocode">
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cartitems-promobox">
                            <input type="text" name="" id="" placeholder='promocode' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {paginationData.totalPages > 1 && (
                <PaginationRounded
                    count={paginationData.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            )}
        </>
    );
};

export default CartItems;
