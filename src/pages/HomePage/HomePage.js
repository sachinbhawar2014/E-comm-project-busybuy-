import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import {
    getAllProducts,
    getProducts,
    getFilteredProducts,
    getLoadingState,
    filterProducts,
} from "../../redux/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";
// import { getAuth } from "firebase/auth";
import { addDataToCollection } from "../../utils/utils";

function HomePage() {
    const [query, setQuery] = useState("");
    const [priceRange, setPriceRange] = useState(75000);
    const [categories, setCategories] = useState({
        mensFashion: false,
        electronics: false,
        jewelery: false,
        womensClothing: false,
    });

    const dispatch = useDispatch();
    const products = useSelector(getProducts);
    const filteredProducts = useSelector(getFilteredProducts);
    const loading = useSelector(getLoadingState);

    // Fetch products on app mount
    useEffect(() => {
        dispatch(getAllProducts());
        addDataToCollection();
    }, [dispatch]);

    // Rerender the products if the search or filter parameters change
    useEffect(() => {
        dispatch(filterProducts({ priceRange, searchQuery: query, categories }));
    }, [priceRange, query, categories, dispatch]);

    // Display loader while products are fetching
    if (loading) {
        return <Loader />;
    }

    return (
        <div className={styles.homePageContainer}>
            <form className={styles.form}>
                <input
                    className={styles.searchInput}
                    type="search"
                    placeholder="Search By Name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>

            <div className="container-fuild mx-2 d-flex flex-column flex-md-row align-items-center align-items-md-start">
                <div className="d-flex align-items-center col-md-3 col-lg-3">
                    <FilterSidebar
                        setPriceRange={setPriceRange}
                        setCategories={setCategories}
                        priceRange={priceRange}
                    />
                </div>
                <div className="d-flex align-items-center">
                    {products.length ? (
                        <ProductList products={products.length ? filteredProducts : null} />
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
