import { useCallback } from "react";
import axios from "axios";

const useCategoryHandlers = (setState) => {
  const handleShowCategories = useCallback(async (fetchCategories, setError) => {
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
      setError(true);
    }
  }, [setState]);

  const handleShowSubcategoryByCategoryId = useCallback(async (categoryId, setError) => {
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
      setError(true);
    }
  }, [setState]);

  const handleSubCategoriesClick = useCallback(async (fetchSubcategories,setError) => {
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
  }, [setState]);

  return { handleShowCategories, handleShowSubcategoryByCategoryId,handleSubCategoriesClick };
};

export default useCategoryHandlers;
