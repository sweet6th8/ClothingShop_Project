import React, { useContext, useState, useEffect, useRef } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import SecondNavbar from '../Components/SecondNavbar/SecondNavbar';
import { useParams } from 'react-router-dom';
import PaginationRounded from '../Components/Pagination/PaginationRounded';

const ShopCategory = (props) => {
    const { id, gender } = useParams();
    const { products, loading, error, fetchProductsBySubCategory, fetchProductsByGender, paginationData } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(false); // Thêm state theo dõi fetch
    const currentPageRef = useRef(currentPage);

    // Cập nhật giá trị currentPageRef khi currentPage thay đổi
    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    // Reset currentPage về 1 khi id hoặc gender thay đổi
    useEffect(() => {
        setCurrentPage(1);  
        setShouldFetch(true); // Đặt trạng thái fetch lại
    }, [id, gender ]);

    // Fetch dữ liệu khi id, gender hoặc currentPage thay đổi
    useEffect(() => {
        const fetchProducts = async () => {
            if (shouldFetch) {
                if (id) {
                    await fetchProductsBySubCategory(id, currentPage);
                } else if (gender) {
                    await fetchProductsByGender(gender, currentPage);
                }
                setShouldFetch(false); // Đặt trạng thái fetch lại sau khi fetch xong
            }else{
                if (id) {
                    await fetchProductsBySubCategory(id,  currentPageRef.current);
                } else if (gender) {
                    await fetchProductsByGender(gender,  currentPageRef.current);
                }
            }

        }
        fetchProducts();
    
    }, [ currentPage, shouldFetch]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredProducts = (products || []).filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='shop-category'>
            <SecondNavbar />
            <div className="shop-category-content">
                <div className="shop-category-main">
                    <img className='shopcategory-banner' src={props.banner} alt="" />
                    <div className="shopcategory-indexSort">
                        <div className="shopcategory-sort">
                            Sort by <img src={dropdown_icon} alt="" />
                        </div>
                    </div>
                    <div className="shopcategory-products">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error.message}</p>
                        ) : filteredProducts.length === 0 ? (
                            <p>No products found</p>
                        ) : (
                            filteredProducts.map((item, i) => (
                                <Item
                                    key={i}
                                    id={item.id}
                                    name={item.name}
                                    new_price={item.price}
                                    image={item.pathImage}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            {paginationData.totalPages > 1 && <PaginationRounded
                count={paginationData.totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />}
        </div>
    );
}

export default ShopCategory;
