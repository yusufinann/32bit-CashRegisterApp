import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [paymentType, setPaymentType] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(true); // ModalSearch
  const [partialPayment, setPartialPayment] = useState(false); // PaymentModal - Receipt
  const [loading, setLoading] = useState(false); // Yükleme durumu eklendi
  const [error, setError] = useState(false);
  
  const [state, setState] = useState({
    barcode: "",
    searchQuery: "",
    categories: [],
    showCategories: false,
    showProducts: true,
    showSubcategories: false, // AltKategorileri gösterip göstermeme durumu için
    showFilteredProducts: false,
    products: [],
    filteredProducts: [], // Filtrelenmiş ürünleri saklamak için
    wantedProduct: [],
    subcategories: [], // Altkategoriler için
  });

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

  const handleShowCategories = useCallback(async () => {
    if (cachedData.categories) {
      updateStateAndKeyboard(true, false, false, false, {
        categories: cachedData.categories,
      });
    } else {
      try {
        const data = await fetchFromAPI("categories");
        setCachedData((prev) => ({ ...prev, categories: data }));
        updateStateAndKeyboard(true, false, false, false, {
          categories: data,
        });
      } catch (error) {
        setError(true);
      }
    }
  }, [cachedData, fetchFromAPI]);

  const handleShowProducts = useCallback(async () => {
    if (cachedData.products) {
      updateStateAndKeyboard(false, true, false, false, {
        products: cachedData.products,
      });
    } else {
      try {
        const data = await fetchFromAPI("products");
        setCachedData((prev) => ({ ...prev, products: data }));
        updateStateAndKeyboard(false, true, false, false, {
          products: data,
        });
      } catch (error) {
        setError(true);
      }
    }
  }, [cachedData, fetchFromAPI]);

  const handleSubCategoriesClick = useCallback(async () => {
    if (cachedData.subcategories) {
      updateStateAndKeyboard(false, false, false, true, {
        subcategories: cachedData.subcategories,
      });
    } else {
      try {
        const data = await fetchFromAPI("subcategories");
        setCachedData((prev) => ({ ...prev, subcategories: data }));
        updateStateAndKeyboard(false, false, false, true, {
          subcategories: data,
        });
      } catch (error) {
        setError(true);
      }
    }
  }, [cachedData, fetchFromAPI]);

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
      }));
    } catch (error) {
      console.error("Error fetching subcategories by category:", error);
      setError(true);
    }
  }, []);

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
      }));
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      setError(true);
    }
  }, []);

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
      const response = await axios.get(
        `http://localhost:3000/products?barcode=${newBarcode}`
      );
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
      console.error("Failed to fetch products:", error);
      setState((prevState) => ({
        ...prevState,
        barcode: newBarcode,
        filteredProducts: [],
        showCategories: false,
        showProducts: true,
        showSubcategories: false,
        showFilteredProducts: false,
      }));
    }
  }, []);

  const handleChange = useCallback(
    (event) => {
      handleSearching(event.target.value);
      console.log(event);
    },
    [handleSearching]
  );

  const updateStateAndKeyboard = (
    showCategories,
    showProducts,
    showFilteredProducts,
    showSubcategories,
    extraState = {}
  ) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        showCategories,
        showProducts,
        showFilteredProducts,
        showSubcategories,
        ...extraState,
      };

      // Only update if the new state is different from the previous state
      if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
        return newState;
      }
      return prevState;
    });
  };

  const contextValue = useMemo(() => ({
    state,
    setState,
    handleBarcodeChange,
    handleShowCategories,
    handleShowProducts,
    handleShowProductsBySubcategory,
    handleSearching,
    handleChange,
    paymentType,
    setPaymentType,
    showAllProducts,
    setShowAllProducts,
    handleSubCategoriesClick,
    handleShowSubcategoryByCategoryId,
    partialPayment,
    setPartialPayment,
    loading,
    error,
  }), [
    state,
    paymentType,
    showAllProducts,
    partialPayment,
    loading,
    error,
    handleBarcodeChange,
    handleShowCategories,
    handleShowProducts,
    handleShowProductsBySubcategory,
    handleSearching,
    handleChange,
    handleSubCategoriesClick,
    handleShowSubcategoryByCategoryId,
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export { useGlobalContext, GlobalContextProvider };
