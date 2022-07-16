import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "./requestMethods";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        await publicRequest
          .get("/products/findAll")
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            setAllProducts(data?.map((product) => product._id));
          });
      } catch (err) {}
    };
    getProduct();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product prodList={allProducts} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default App;
