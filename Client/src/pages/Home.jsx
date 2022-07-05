import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </React.Fragment>
  );
};

export default Home;
