import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import useFetchApi from "../SalesPage/FetchApi/UseFetchApi";

import axios from "axios";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    searchQuery: "",
    categories: [],
    showCategories: false,
    showProducts: true,
    showSubcategories: false,
    showFilteredProducts: false,
    products: [],
    filteredProducts: [],
    wantedProduct: [],
    subcategories: [],
  });

  const { loading, error, fetchCategories, fetchProducts, fetchSubcategories, handleBarcodeChange, setError } = useFetchApi(setState, state);

  const [showAllProducts, setShowAllProducts] = useState(true); // ModalSearch

  const handleShowCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setState((prev) => ({
        ...prev,
        categories: data,
        showCategories: true,
        showProducts: false,
        showSubcategories: false,
        showFilteredProducts: false,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(true); // Optional: Handle error state if needed
    }
  }, [fetchCategories,setError]);

  const handleShowProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setState((prev) => ({
        ...prev,
        products: data,
        showCategories: false,
        showProducts: true,
        showSubcategories: false,
        showFilteredProducts: false,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(true); // Optional: Handle error state if needed
    }
  }, [fetchProducts, setError]);

  const handleSubCategoriesClick = useCallback(async () => {
    try {
      const data = await fetchSubcategories();
      setState((prev) => ({
        ...prev,
        subcategories: data,
        showCategories: false,
        showProducts: false,
        showSubcategories: true,
        showFilteredProducts: false,
      }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setError(true); // Optional: Handle error state if needed
    }
  }, [fetchSubcategories, setError]);

  const handleShowProductsBySubcategory = useCallback(async (subcategoryId) => {
    try {
      const url = `http://localhost:3000/products?subcategories=${subcategoryId}`;
      const response = await axios.get(url);
      const data = response.data;

      setState((prevState) => ({
        ...prevState,
        products: data,
        showCategories: false,
        showProducts: true,
        showSubcategories: false,
        showFilteredProducts: false,
      }));
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      setError(true); // Optional: Handle error state if needed
    }
  }, [setError]);

  const handleShowSubcategoryByCategoryId = useCallback(async (categoryId) => {
    try {
      const url = `http://localhost:3000/subcategories?category_id=${categoryId}`;
      const response = await axios.get(url);
      const data = response.data;

      setState((prevState) => ({
        ...prevState,
        subcategories: data,
        showCategories: false,
        showProducts: false,
        showSubcategories: true,
        showFilteredProducts: false,
      }));
    } catch (error) {
      console.error("Error fetching subcategories by category:", error);
      setError(true); // Optional: Handle error state if needed
    }
  }, [setError]);

  const handleSearching = useCallback(
    (query) => {
      const formattedQuery = query.trim().toLowerCase();
      const wantedProducts = state.products.filter((product) =>
        product.product_name.toLowerCase().startsWith(formattedQuery)
      );

      setState((prev) => ({
        ...prev,
        searchQuery: query,
        wantedProduct: wantedProducts,
      }));

     setShowAllProducts(false);
    },
    [state.products]
  );

  const handleChange = useCallback(
    (event) => {
      handleSearching(event.target.value);
      console.log(event);
    },
    [handleSearching]
  );

  const contextValue = useMemo(
    () => ({
      state,
      setState,
      handleShowCategories,
      handleShowProducts,
      handleSubCategoriesClick,
      handleShowProductsBySubcategory,
      handleShowSubcategoryByCategoryId, 
      loading,
      error,
      setError,
      handleBarcodeChange,
      handleChange,
      showAllProducts,
      setShowAllProducts,
    }),
    [
      state,
      loading,
      error,
      handleShowCategories,
      handleShowProducts,
      handleSubCategoriesClick,
      handleShowProductsBySubcategory,
      handleShowSubcategoryByCategoryId,
      setError,
      handleBarcodeChange,
      handleChange,
      showAllProducts,
      setShowAllProducts,
    ]
  );

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export { useGlobalContext, GlobalContextProvider };
