import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import useFetchApi from "../SalesPage/FetchApi/UseFetchApi";
import useCategoryHandlers from "../hooks/useCategoryHandlers";
import useProductHandlers from "../hooks/useProductHandlers";
import useSearchHandlers from "../hooks/useSearchHandlers";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const initialState = {
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
  };

  const [state, setState] = useState(initialState);

  const { 
    loading, 
    error, 
    setError, 
    handleBarcodeChange, 
    fetchCategories, 
    fetchProducts, 
    fetchSubcategories 
  } = useFetchApi(setState);

  const { 
    handleShowCategories, 
    handleShowSubcategoryByCategoryId, 
    handleSubCategoriesClick 
  } = useCategoryHandlers(setState);

  const { 
    handleShowProducts, 
    handleShowProductsBySubcategory 
  } = useProductHandlers(setState);

  const { 
    handleChange, 
    showAllProducts, 
    setShowAllProducts 
  } = useSearchHandlers(state, setState);

  // Use useCallback to memoize handler functions
  const memoizedHandleShowCategories = useCallback(() => handleShowCategories(fetchCategories, setError), [handleShowCategories, fetchCategories, setError]);
  const memoizedHandleShowProducts = useCallback(() => handleShowProducts(fetchProducts, setError), [handleShowProducts,fetchProducts, setError]);
  const memoizedHandleShowProductsBySubcategory = useCallback((subcategoryId) => handleShowProductsBySubcategory(subcategoryId, setError), [handleShowProductsBySubcategory, setError]);
  const memoizedHandleShowSubcategoryByCategoryId = useCallback((categoryId) => handleShowSubcategoryByCategoryId(categoryId, setError), [handleShowSubcategoryByCategoryId, setError]);
  const memoizedHandleSubCategoriesClick = useCallback(() => handleSubCategoriesClick(fetchSubcategories, setError), [handleSubCategoriesClick,fetchSubcategories, setError]);

  // Memoize context value for performance optimization
  const contextValue = useMemo(() => ({
    state,
    setState,
    handleShowCategories: memoizedHandleShowCategories,
    handleShowProducts: memoizedHandleShowProducts,
    handleShowProductsBySubcategory: memoizedHandleShowProductsBySubcategory,
    handleShowSubcategoryByCategoryId: memoizedHandleShowSubcategoryByCategoryId,
    loading,
    error,
    handleBarcodeChange,
    handleChange,
    showAllProducts,
    setShowAllProducts,
    handleSubCategoriesClick: memoizedHandleSubCategoriesClick,
  }), [
    state,
    setState,
    memoizedHandleShowCategories,
    memoizedHandleShowProducts,
    memoizedHandleShowProductsBySubcategory,
    memoizedHandleShowSubcategoryByCategoryId,
    loading,
    error,
    handleBarcodeChange,
    handleChange,
    showAllProducts,
    setShowAllProducts,
    memoizedHandleSubCategoriesClick,
  ]);

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

// Custom hook for accessing the global context
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export { useGlobalContext, GlobalContextProvider };
