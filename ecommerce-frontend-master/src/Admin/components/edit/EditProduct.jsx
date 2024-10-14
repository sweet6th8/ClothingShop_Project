import "../../pages/new/new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveProductById } from "../../../API/ApiProduct";
import { retrieveSubCategories } from "../../../API/ApiSubCategory";
import { modifyProduct } from "../../Api/AdProductApi";

const EditProduct = ({ title }) => {
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await retrieveSubCategories();
                setSubCategories(response);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin danh mục phụ:", error);
            }
        }
        fetchSubCategories();
    }, [productId]);

   

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await retrieveProductById(productId);
                setProductData({
                    id: productId,
                    name: response.name,
                    price: response.price,
                    pathImage: response.pathImage,
                    subCategoryName: response.subCategoryName
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sản phẩm:", error);
            }
        };

        fetchProductById();
    }, [productId]);

    

    if (!productData) return <div>Đang tải...</div>;

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
    }

    const handleSelectChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            subCategory: e.target.value
        }));
    }

    const handleSubmitEdit = async () => {
        if(!productData.name || !productData.price || !productData.pathImage || !productData.subCategoryName){
            alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
            return;
        }else if(productData.price < 0){
            alert("Giá sản phẩm không hợp lệ!");
            return;
        }
     try {
            await modifyProduct(productData);
            alert("Sản phẩm đã được chỉnh sửa thành công!");
            navigation('/products')
        }catch (error) {
            alert("Lỗi sản phẩm khi chỉnh sửa!");
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
                        />
                    </div>
                    <div className="right">
                        <form>
                            {/* <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div> */}

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
                                    value={(productData.price)}
                                    onChange={handlePriceChange}
                                />
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
                                <label htmlFor="subCategory">Danh mục phụ</label>
                                <select
                                    id="subCategory"
                                    value={productData.subCategory}
                                    onChange={handleSelectChange}
                                >
                                    {subCategories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
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

export default EditProduct;
