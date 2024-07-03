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
      console.error("Error fetching products:", error);
      setError(true);
    }
  }, [setState]);

  const handleShowProductsBySubcategory = useCallback(async (subcategoryId, setError) => {
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
      setError(true);
    }
  }, [setState]);

  

  return { handleShowProducts, handleShowProductsBySubcategory };
};

export default useProductHandlers;
