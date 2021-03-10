import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dimmer, Loader } from "semantic-ui-react";
import { getFilteredProducts, getProductList } from "../actions/productActions";
import { getCategoryList } from "../actions/categoryActions";
import { addToCart } from "../actions/cartActions";
import Checkbox from "../components/Checkbox";
import RadioBox from "../components/RadioBox";
import { prices } from "../components/priceChart";
import ProductDetails from "../components/ProductDetails";
import Pagination from "react-js-pagination";


const Filter = () => {
	const [myFilters, setMyFilters] = useState({
	  filters: { category: [], price: [] }
	});
	const [limit, setLimit] = useState(100);
	const [skip, setSkip] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(6);
	const [activePage, setActivePage] = useState(1);
	
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.filterList);
	const categoryList = useSelector((state) => state.categoryList);
	const { loading, error, products } = productList;
	const { categories } = categoryList;
	const size = products.length;
	
	const init = () => {
	  dispatch(getCategoryList());
	};
	
	const loadFilteredResults = newFilters => {
      dispatch(getFilteredProducts(skip, limit, newFilters));
	  setActivePage(1);
	};
	
	useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
	}, []);
	
	
	const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
	};
	
	const handlePrice = value => {
	  const data = prices;
	  let array = [];
	  
	  for (let key in data) {
		if (data[key]._id === parseInt(value)) {
		  array = data[key].array;
		}
	  }
	  return array;
	};
	
	const addToCartHandler = (event, id) => {
	  event.preventDefault();
	  dispatch(addToCart(id, 1));
	};
	
	const handlePageChange = (pageNumber) => {
	  console.log(`active page is ${pageNumber}`);
	  setActivePage(pageNumber);
	}
	const totalItems = products.length;
	let activeProducts = products.slice (itemsPerPage * activePage - itemsPerPage, itemsPerPage * activePage);
	
	const onChange = (e) => {
	  setItemsPerPage( e.target.value )
    };
	
    return (
      <div className="filter-page">
		<div className="sidebar">
		  <a href="/">Home</a>
		  <a href="/store">Search</a>
		  <a href="/cart">Your Cart</a>
		  
		  <div className="select">
		    <h2>Results Per Page</h2>
		    <select onChange={onChange}>
			  <option value={6}>6</option>
		      <option value={9}>9</option>
			  <option value={12}>12</option>
            </select>
		  </div>
		   
		  <div className="filters">
			<div>
			  <h2>Categories</h2>
			  <ul>
				<Checkbox
				  categories={categories}
				  handleFilters={filters =>
					handleFilters(filters, "category")
				  }
				/>
			  </ul>
			</div>
			<div>
			  <h2>Price</h2>
			  <RadioBox
				prices={prices}
				handleFilters={filters =>
				  handleFilters(filters, "price")
				}
			  />
			</div>
		  </div>
		  
		</div>
		
		{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>)
		: 
		error ? (<div> {error.message} </div>)
		: (
        <div className="filter-results">
		
		<div className="products">
		  {activeProducts.map((product) => (
			<li key={product._id}>
			<ProductDetails
			  product={product}
			  addToCart={event => {addToCartHandler(event, product._id)}}
			/>
			</li>
		  ))}
		</div>
		
		<Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
		
        </div>
		)}
		
      </div>
    );
};

export default Filter;
