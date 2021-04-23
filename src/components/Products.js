import React, { useEffect, useState } from "react";
import "./style.css";
import productsJsonData from '../data/products.json';
import ProductCard from "./ProductCard";




function Products() {
  const [searchKeyword, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);

  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    console.log(currentPage);
    console.log(pageNumberLimit);
    console.log((currentPage - 1) % pageNumberLimit);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };
  
  const searchInputOnchange = e => {
    setSearch(e.target.value)
  };


  useEffect(() => {
    let productsArr=productsJsonData.data.products.items;
    //console.log(productsArr);
    setData(productsArr);
  }, []);

  useEffect(() => {
    setFilteredProducts(
      data.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, data]);


  const renderData = (data) => {
    let finalProductsList=data;
    if(searchKeyword=="")
      finalProductsList=data;
    else
      finalProductsList=filteredProducts;

    return (
      <ul>
        {finalProductsList.map((product, index) => {
          return (
            <ProductCard key={product.id} product={product} />
          );
        })}
      </ul>
    );
  };


  return (
    <>
      <h1>BSTN Products</h1> 
      <div class="search-form-row">
        <div class="col-12">
                <input
                  type="text"
                  placeholder="Search Product"
                  onChange={searchInputOnchange}
                  class="form-control form-control-sm"
                  id="serach-textbox"
                />
          </div>
         </div>
      <br />
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className={currentPage != 1 ? "loadmore invisible" : "loadmore"}>
        Load More
      </button>
    </>
  );
}

export default Products;
