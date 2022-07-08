import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const filterHandler = (event) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  };
  const priceHandler = (event) => {
    const priceSort = event.target.value;
    setSort(priceSort);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Container>
        <Title>{category[0].toUpperCase() + category.slice(1)}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select defaultValue={"Size"} name="size" onChange={filterHandler}>
              <Option disabled value="Size">
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select defaultValue={"newest"} onChange={priceHandler}>
              <Option selected value="newest">
                Newest
              </Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={category} filters={filters} sort={sort} />
      </Container>
      <Newsletter />
      <Footer />
    </React.Fragment>
  );
};

export default ProductList;
