import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import banner_mens from './Components/assets/banner_mens.png';
import banner_womens from './Components/assets/banner_women.png';
import banner_kids from './Components/assets/banner_kids.png';
import ShopContextProvider from './Context/ShopContext';
import SearchProductPage from './Pages/SearchProductPage';
import CartContextProvider from './Context/CartContext';
import { DarkModeContext } from './Admin/context/darkModeContext'
import Home from './Admin/pages/home/Home'
import List from "./Admin/pages/list/List";
import Single from "./Admin/pages/single/Single";
import './Admin/style/dark.css';
import ProtectedRoute from './Admin/pages/ProtectedRoute';
import ProductList from './Admin/pages/list/productList/ProductList';
import DetailViewProduct from './Admin/components/detailView/DetailViewProduct'
import EditProduct from './Admin/components/edit/EditProduct';
import AddNewProduct from './Admin/pages/new/AddNewProduct';
import OrderList from './Admin/pages/list/orderList/OrderList';
import InventoryList from './Admin/pages/list/inventoryList/InvetoryList'
import EditInventory from './Admin/components/edit/EditInventory';
import SubCategoryList from './Admin/pages/list/subCategoryList/SubCategoryList';
import Logout from './Pages/Logout';
import NavbarProvider from './Context/NavbarContext';
import './API/Interceptor'


function App() {

  const { darkMode } = useContext(DarkModeContext);

  return (
    // <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
      <NavbarProvider>
        <ShopContextProvider>
          <CartContextProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Shop />} />
              <Route path="/mens" element={<ShopCategory banner={banner_mens} category="men" />} />
              <Route path="/womens" element={<ShopCategory banner={banner_womens} category="women" />} />
              <Route path="/kids" element={<ShopCategory banner={banner_kids} category="kid" />} />
              <Route path='/product/subcategory/:id' element={<ShopCategory />} />
              <Route path='/product/gender/:gender' element={<ShopCategory />} />
              <Route path='/catalogsearch/result/:result' element={<SearchProductPage />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/logout" element={<Logout />} />

              {/* Admin */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<Home />} />
                <Route path="/users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                </Route>

                <Route path="/products">
                  <Route index element={<ProductList />} />
                  <Route path=":productId" element={<Single />} />
                  <Route
                    path="view/:productId"
                    element={<DetailViewProduct title="View Product" />}
                  />
                  <Route
                    path="view/edit/:productId"
                    element={<EditProduct title="Edit Product" />}
                  />
                  <Route
                    path="addNewProduct"
                    element={<AddNewProduct title="New Product" />}
                  />
                </Route>

                <Route path="/orders">
                  <Route index element={<OrderList />} />
                </Route>

                <Route path="/inventory">
                  <Route index element={<InventoryList />} />
                  <Route
                    path="edit/:inventoryId"
                    element={<EditInventory title="Edit quantity " />}
                  />
                </Route>

                <Route path="/subcategory">
                  <Route index element={<SubCategoryList />} />
                  <Route
                    path="edit/:inventoryId"
                    element={<EditInventory title="Edit quantity " />}
                  />
                </Route>

              </Route>
            </Routes>
            <Footer />

          </CartContextProvider>
        </ShopContextProvider>
      </NavbarProvider>
    </BrowserRouter>
  );
}

export default App;
