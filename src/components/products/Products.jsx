import React, {useState, useEffect} from 'react'
import Product from '../product/Product';
import "./products.css";
import ProductDetail from "../productDetail/ProductDetail";
import Loading from '../../pages/loading/Loading';

const Products = ({products, loading}) => {
    
    const [search, setSearch] = useState("");
    const [showProductDetail, setShowProductDetail] = useState(false);
    const allCategories = ['all', ...new Set(products.map((item) => item.category))];
    const [categories, setCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] =useState([]);
    const [sort, setSort] = useState("price-lowest");
    const [value, setValue] = useState(1000);

  
    useEffect(() => {
        const searchedProducts = products?.filter((product) => (product.title?.substring(0, 25).toLowerCase().includes(search.toLowerCase())));
        setFilteredProducts(searchedProducts);
    },[search, products]);
   
    useEffect(() => {
        const categorizedProducts = products.filter((product) =>categories ==='all' ? product: product.category ===categories);
        setFilteredProducts(categorizedProducts);
    }, [categories, products]);

    useEffect(() => {
        if(sort === 'price-highest'){
            const descProducts = products.sort((a,b) => {
                return a.price - b.price;
            })
            setFilteredProducts(descProducts)
        }
        else if(sort === 'price-lowest'){
            const ascProducts = products.sort((a, b) => {
                return b.price - a.price;
            })
            setFilteredProducts(ascProducts);
        }

        else if(sort==='name-a'){
            const sortAProduct = products.sort((a,b) => {
                const nameA = a?.title?.toUpperCase();
                const nameB = b?.title?.toUpperCase();

                if(nameA < nameB) {
                    return 1
                }
                if(nameA > nameB){
                    return -1;
                }
                return 0;
            })
            setFilteredProducts(sortAProduct);
        }
        else if(sort==='name-z'){
            const sortedProduct = products.sort((a,b) => {
                const nameA = a?.title?.toUpperCase();
                const nameB = b?.title?.toUpperCase();

                if(nameA < nameB) {
                    return -1
                }
                if(nameA > nameB){
                    return 1;
                }
                return 0;
            })
            setFilteredProducts(sortedProduct);
        }
        else {
            setFilteredProducts(products);
        }
    }, [sort]);

    useEffect(() => {
        const filteredProduct = products.filter((product) => product.price <= value);
        setFilteredProducts(filteredProduct);
    }, [value, products]);


    const clearFilter = () => {
        setCategory('all');
        setValue(1000);
        setSort("price-lowest");
        setFilteredProducts(products);
    }

    
   return (
    <div className="products">
        <div className="product-list-container">
            <div className="product-sidebar">
                <div className="search-box">
                <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="search-input"/>
                </div>
                <h3 className="category-title">Category</h3>
                {allCategories.map((category, index) => (
                    <button key={index} className="sidebar-button" onClick={() => setCategory(category)}>
                        <span >{category}</span>
                    </button>
                ))}
                <h3 className="sidebar-price">Price</h3>
                <p className="price-label">${value}</p>
                <input type="range" name="price" min="0" max="1200" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button className="clear-button" onClick={clearFilter}>Clear filters</button>
            </div>
            <div className="productsList">
                <div className="filter-box">
                    <div className="filter-buttons">
                        <button className={`filter-button ${!showProductDetail && `active`}`} onClick={() => setShowProductDetail(false)}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"
                                clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <button className={`filter-button ${showProductDetail && `active`}`} onClick={() => setShowProductDetail(true)}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                                clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <p className="found-product">{filteredProducts.length} Products Found</p>
                    <hr className="hr"/>
                    <div className="product-sort">
                        <label htmlFor="sort">Sort By</label>
                        <select name="sort" id="sort" value={sort} className="sort-input" onChange={(e) => setSort(e.target.value)}>
                            <option value="price-lowest">Price(Lowest)</option>
                            <option value="price-highest">Price(Highest)</option>
                            <option value="name-a">Name(A-Z)</option>
                            <option value="name-z">Name(Z-A)</option>
                        </select>
                    </div>
                </div>
                {loading ? <Loading /> : ( <>
                   {!showProductDetail? <Product products={filteredProducts ? filteredProducts : products} />:
                   <ProductDetail products={filteredProducts ? filteredProducts : products}/>}
                </>)}
            </div>
        </div> 
    </div>
  )
}

export default Products;