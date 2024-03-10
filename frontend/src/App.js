import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import Shop from "./pages/product/Shop";
import ProductDetail from "./pages/product/productDetail";
import Checkout from "./pages/product/Checkout";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";

// admin side routing
import AddProduct from "./admin/AddProduct";
import AddTag from "./admin/AddTag";
import AddProductInventory from "./admin/AddProductInventory";
import AddCategory from "./admin/AddCategory";
import ProductList from "./admin/ProductList";
import TagsList from "./admin/TagsList";
import ProductInventoryList from "./admin/ProductInventoryList";
import CategoriesList from "./admin/CategoriesList";


import FileUpload from "./admin/FileUpload";
import AddAddress from "./customer/AddAddress";

function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />


        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/admin/addTag" element={<AddTag />} />
        <Route path="/admin/addProductInventory" element={<AddProductInventory />} />
        <Route path="/admin/addCategory" element={<AddCategory />} />

        <Route path="/admin/product" element={<ProductList />} />
        <Route path="/admin/tags" element={<TagsList />} />
        <Route path="/admin/productinventory" element={<ProductInventoryList />} />
        <Route path="/admin/categories" element={<CategoriesList />} />


        <Route path="/addAddress" element={<AddAddress />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/upload" element={<FileUpload />} />


      </Routes>
    </Router>
  );
}

export default App;
