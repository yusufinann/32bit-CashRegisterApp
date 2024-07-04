import { useCallback } from "react";
import axios from "axios";

const useProductHandlers = (setState) => {
  const handleShowProducts = useCallback(async (fetchProducts, setError) => {
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
      setError(true);
    }
  }, [setState]);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleShowProductsBySubcategory = useCallback(async (subcategoryId, setError) => {
    try {
      const url =  `${baseURL}/products?subcategories=${subcategoryId}`;
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
      setError(true);
    }
  }, [setState,baseURL]);

  

  return { handleShowProducts, handleShowProductsBySubcategory };
};

export default useProductHandlers;
