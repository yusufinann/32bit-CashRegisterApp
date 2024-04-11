import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isLoggedIn: false,
    user: null,
    // other properties...
  });

  const [state, setState] = useState({
    barcode: '',
    categories: [],
    showCategories: false,
    showProducts: false,
    products: [],
    selectedProduct: null,
    filteredProducts: [], // Filtrelenmiş ürünleri saklamak için
 
    // other properties specific to LeftSales...
  });

  
  const [cart, setCart] = useState([]); // New state for cart

  const login = (user) => {
    setGlobalState({
      ...globalState,
      isLoggedIn: true,
      user: user,
    });
  };

  const logout = () => {
    setGlobalState({
      ...globalState,
      isLoggedIn: false,
      user: null,
    });
  };

  const handleBarcodeChange = async (event) => {
    const newBarcode = event.target.value;
    console.log('New barcode:', newBarcode); // Konsola barkod değerini yazdır
    const filteredProducts = state.products.filter(product => product.barcode === newBarcode);
    
    if (filteredProducts.length > 0) {
      setState(prevState => ({ 
        ...prevState, 
        barcode: newBarcode, 
        filteredProducts: filteredProducts,
        showCategories: false, // Diğer durumları false olarak ayarla
        showProducts: false,   // Diğer durumları false olarak ayarla
        showFilteredProducts: true // Filtrelenmiş ürünler varsa true olarak ayarla
      }));
    } else {
      setState(prevState => ({ 
        ...prevState, 
        barcode: newBarcode,
        showCategories: false, // Diğer durumları false olarak ayarla
        showProducts: true,   // Ürünleri gösterme durumunu true olarak ayarla
        showFilteredProducts: false // Filtrelenmiş ürünleri gösterme durumunu false olarak ayarla
      }));
    }
  };


  const handleShowCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      if (!response.ok) {
        throw new Error("API response was not ok.");
      }
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        categories: data,
        showCategories: true,
        showProducts: false,
        showFilteredProducts:false
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleShowProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('API response was not ok.');
      }
      const data = await response.json();
      setState({
        ...state,
        products: data,
        showCategories: false,
        showProducts: true,
        showFilteredProducts:false
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
 
  useEffect(() => {
    // Sayfa yüklendiğinde ürünleri göster
    handleShowProducts();
  }, []); // Boş bağımlılık dizisi kullanarak yalnızca bir kez çalışmasını sağlar
  
  const handleShowProductsByCategoryId = async (categoryId) => {
    try {
      let url = "http://localhost:3000/products";
      if (categoryId) {
        url += `?category_id=${categoryId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('API response was not ok.');
      }
      const data = await response.json();
      setState(prevState => ({
        ...prevState,
        products: data, // Yeni ürünleri eski ürünlerin üzerine yaz
        showCategories: false,
        showProducts: true,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== product.id));
  };

  const increaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === product.id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(Boolean)
    );
  };

  const contextValue = {
    globalState,
    login,
    logout,
    state,
    handleBarcodeChange,
    handleShowCategories,
    handleShowProducts,
    handleShowProductsByCategoryId,   
    cart, 
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    // other functions...
  };

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
