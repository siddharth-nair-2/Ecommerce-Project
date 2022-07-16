import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import NewProduct from "./pages/new/NewProduct";
import Single from "./pages/single/Single";
import SingleOrder from "./pages/single/SingleOrder";
import SingleProduct from "./pages/single/SingleProduct";
import { Routes, Route, Navigate } from "react-router-dom";
import { orderInputs, productInputs, userInputs } from "./formSrc";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { orderCols, productCols, userCols } from "./datatableSrc";
import { useSelector } from "react-redux";
import NewUser from "./pages/new/NewUser";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  let admin = useSelector((state) => {
    return state.user.currentUser;
  });
  const isAdmin = admin ? admin.isAdmin : false;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route
          path="/login"
          element={isAdmin ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={!isAdmin ? <Navigate to="/login" /> : <Home />}
        />
        <Route path="/users">
          <Route
            index
            element={
              !isAdmin ? (
                <Navigate to="/login" />
              ) : (
                <List columns={userCols} title="All Users" />
              )
            }
          />
          <Route
            path=":userId"
            element={!isAdmin ? <Navigate to="/login" /> : <Single />}
          />
          <Route
            path="new"
            element={
              !isAdmin ? (
                <Navigate to="/login" />
              ) : (
                <NewUser inputs={userInputs} title="Add New User" />
              )
            }
          />
        </Route>
        <Route path="/products">
          <Route
            index
            element={
              !isAdmin ? (
                <Navigate to="/login" />
              ) : (
                <List columns={productCols} title="All Products" />
              )
            }
          />
          <Route
            path=":productId"
            element={!isAdmin ? <Navigate to="/login" /> : <SingleProduct />}
          />
          <Route
            path="new"
            element={
              !isAdmin ? (
                <Navigate to="/login" />
              ) : (
                <NewProduct inputs={productInputs} title="Add New Product" />
              )
            }
          />
        </Route>
        <Route path="/orders">
          <Route
            index
            element={
              !isAdmin ? (
                <Navigate to="/login" />
              ) : (
                <List columns={orderCols} title="All Orders" />
              )
            }
          />
          <Route
            path=":orderId"
            element={!isAdmin ? <Navigate to="/login" /> : <SingleOrder />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
