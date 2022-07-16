import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./singleproduct.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./update.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import axios from "axios";
import ProductTable from "../../components/ind-Tables/ProductTable";

const ProgressCircle = styled.div`
  width: 200px;
  height: 200px;
`;

const LoadingBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #1a1431d5;
  border-radius: 24px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
`;

const Option = styled.option`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid gray;
  outline: none;
`;

const Update = ({ title, productInfo }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [upPercent, setUpPercent] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const catHandler = (e) => {
    setCategories(e.target.value.split(","));
  };
  const sizeHandler = (e) => {
    setSize(e.target.value.split(","));
  };

  const confirmUpdateHandler = () => {
    Store.addNotification({
      title: "Product Updated!",
      message: "This product has been updated!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      width: 300,
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
    setTimeout(() => navigate("/products"), 3000);
  };

  const productUpdateHandler = async (e) => {
    e.preventDefault();
    if (!file.name) {
      Store.addNotification({
        title: "No Image!",
        message: "Please add an image to the update form!",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        width: 300,
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      return;
    }
    setLoadingState(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/cyborgsid2/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateProduct = async () => {
        try {
          const res = await userRequest.put(`/products/${productInfo._id}`, {
            ...info,
            img: url,
            categories: categories,
            size: size,
          });
        } catch {}
      };
      updateProduct();
      setUpPercent(100);
      setTimeout(() => setLoadingState(false), 1000);
      setTimeout(() => confirmUpdateHandler(), 1000);
    } catch (error) {
      console.log(error);
      setLoadingState(false);
    }
  };

  return (
    <div className="update-new">
      <div className="update-newContainer">
        <div className="update-bottom">
          {loadingState && (
            <LoadingBlock>
              <ProgressCircle>
                <CircularProgressbar
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    textSize: "16px",
                    pathTransitionDuration: 1,
                    pathColor: `rgb(62, 152, 199)`,
                    textColor: "white",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                  value={upPercent}
                  text={`${upPercent}%`}
                  strokeWidth={5}
                />
              </ProgressCircle>
            </LoadingBlock>
          )}
          <h1>{title}</h1>
          <div className="update-left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
              alt=""
            />
          </div>
          <div className="update-right">
            <form className="update-form">
              <div className="update-formInput">
                <label htmlFor="file">
                  Image:{" "}
                  <DriveFolderUploadOutlinedIcon className="update-icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="update-formInput">
                <label>Title:</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="title"
                  placeholder={productInfo.title}
                />
              </div>
              <div className="update-formInput">
                <label>Description:</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="desc"
                  placeholder={productInfo.desc}
                />
              </div>
              <div className="update-formInput">
                <label>Price:</label>
                <input
                  onChange={changeHandler}
                  type="number"
                  id="price"
                  placeholder={productInfo.price}
                />
              </div>
              <div className="update-formInput">
                <label>Categories:</label>
                <input
                  onChange={catHandler}
                  type="text"
                  id="categories"
                  placeholder={productInfo.categories}
                />
              </div>
              <div className="update-formInput">
                <label>Sizes:</label>
                <input
                  onChange={sizeHandler}
                  type="text"
                  id="size"
                  placeholder={productInfo.size}
                />
              </div>
              <div className="update-formInput">
                <label>In Stock:</label>
                <Select id="inStock" onChange={changeHandler}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>

              <button onClick={productUpdateHandler}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [showEdit, setShowEdit] = useState(false);
  const [prodStats, setProdStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid=" + productId);
        res.data.map((item) =>
          setProdStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {}
    };
    getStats();
  }, [MONTHS, productId]);

  const catArr = product.categories?.map((element) => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });

  const catVal = `[ ${catArr?.join(", ")} ]`;
  const sizeVal = `[ ${product.size?.join(", ")} ]`;

  const editButtonToggle = (e) => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="single">
      <ReactNotifications />
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={editButtonToggle}>
              EDIT
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={product.img} alt="" className="itemImg" />
              <div className="details">
                <h2 className="itemTitle">{product.title}</h2>
                <div className="detailItem">
                  <span className="itemKey">Description: </span>
                  <p className="itemValueDesc">{product.desc}</p>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price: </span>
                  <span className="itemValue">${product.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">In stock: </span>
                  <span className="itemValue">
                    {product.inStock ? "Yes" : "No"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Categories: </span>
                  <span className="itemValue">{catVal}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sizes: </span>
                  <span className="itemValue">{sizeVal}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={3.5 / 1}
              title="Sales Performance"
              dataInfo={prodStats}
              dataKey="Sales"
            />
          </div>
        </div>
        {showEdit && <Update title="Update Product" productInfo={product} />}
        <div className="bottom">
          <h1 className="title">Recent Transactions</h1>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
