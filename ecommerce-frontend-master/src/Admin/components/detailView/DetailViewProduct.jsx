import "../../pages/new/new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { retrieveProductById } from "../../../API/ApiProduct";
import { formatPrice } from '../../../Components/Item/Item';

const DetailViewProduct = ({ title }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [file, setFile] = useState("");
    const navigation = useNavigate();

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await retrieveProductById(productId);
                setProduct(response);
                setFile(response.pathImage); // Thiết lập URL hình ảnh từ phản hồi API
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sản phẩm:", error);
            }
        };

        fetchProductById();
    }, [productId]);

    if (!product) return <div>Đang tải...</div>; // Xử lý trạng thái tải dữ liệu

    const handleSubmit = () => {
        navigation(`/products/view/edit/${productId}`);
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
                            alt={product.name || "Hình ảnh sản phẩm"}
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="name">Tên</label>
                                <input type="text" id="name" value={product.name} readOnly />
                            </div>

                            <div className="formInput">
                                <label htmlFor="price">Giá</label>
                                <input type="text" id="price" value={ formatPrice(product.price) } readOnly />
                            </div>

                            <div className="formInput">
                                <label htmlFor="imageUrl">URL Hình ảnh</label>
                                <input type="text" id="imageUrl" value={product.pathImage} readOnly />
                            </div>

                            <div className="formInput">
                                <label htmlFor="subCategory">Danh mục phụ</label>
                                <input type="text" id="subCategory" value={product.subCategoryName} readOnly />
                            </div>
                        </form>
                        <div className="button">
                            <button type="submit" onClick={() => handleSubmit()}>Eddit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailViewProduct;
