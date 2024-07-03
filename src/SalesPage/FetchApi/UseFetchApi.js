import { useState, useCallback } from "react";
import axios from "axios";

const useFetchApi = (setState) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cachedData, setCachedData] = useState({
    categories: null,
    products: null,
    subcategories: null,
  });

  const fetchFromAPI = useCallback(async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      const data = response.data;
      return data;
    } catch (error) {
      setError(true);
      throw error; 
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    if (cachedData.categories) {
      return cachedData.categories;
    } else {
      try {
        const data = await fetchFromAPI("categories");
        setCachedData((prev) => ({ ...prev, categories: data }));
        return data;
      } catch (error) {
        setError(true);
        throw error;
      }
    }
  }, [cachedData, fetchFromAPI]);

  const fetchProducts = useCallback(async () => {
    if (cachedData.products) {
      return cachedData.products;
    } else {
      try {
        const data = await fetchFromAPI("products");
        setCachedData((prev) => ({ ...prev, products: data }));
        return data;
      } catch (error) {
        setError(true);
        throw error;
      }
    }
  }, [cachedData, fetchFromAPI]);

  const fetchSubcategories = useCallback(async () => {
    if (cachedData.subcategories) {
      return cachedData.subcategories;
    } else {
      try {
        const data = await fetchFromAPI("subcategories");
        setCachedData((prev) => ({ ...prev, subcategories: data }));
        return data;
      } catch (error) {
        setError(true);
        throw error;
      }
    }
  }, [cachedData, fetchFromAPI]);

  const handleBarcodeChange = useCallback(async (event) => {
    const newBarcode = event.target.value;
    if (!newBarcode.trim()) {
      setState((prevState) => ({
        ...prevState,
        barcode: "",
        filteredProducts: [],
        showCategories: false,
        showProducts: true,
        showFilteredProducts: false,
      }));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/products?barcode=${newBarcode}`);
      const filteredProducts = response.data;
      setState((prevState) => ({
        ...prevState,
        barcode: newBarcode,
        filteredProducts,
        showCategories: false,
        showSubcategories: false,
        showProducts: filteredProducts.length === 0,
        showFilteredProducts: filteredProducts.length > 0,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        barcode: newBarcode,
        filteredProducts: [],
        showCategories: false,
        showProducts: true,
        showSubcategories: false,
        showFilteredProducts: false,
      }));
      setError(true); // Hata durumunu belirt
    }
  }, [setState]);

  return {
    loading,
    error,
    setError,
    fetchCategories,
    fetchProducts,
    fetchSubcategories,
    handleBarcodeChange
  };
};

export default useFetchApi;
