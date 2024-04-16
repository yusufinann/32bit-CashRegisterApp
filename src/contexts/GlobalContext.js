import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isLoggedIn: false,
    user: null,
    // other properties...
  });

  const [state, setState] = useState({
    barcode: '',
    searchQuery:'',
    categories: [],
    showCategories: false,
    showProducts: false,
    products: [],
    selectedProduct: null,
    filteredProducts: [], // Filtrelenmiş ürünleri saklamak için
    showFilteredProducts:false,
    wantedProduct:[],
    // other properties specific to LeftSales...
  });

  
  const [cart, setCart] = useState([]); // New state for cart
  const [totalAmount, setTotalAmount] = useState(0);

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
      const response = await axios.get('http://localhost:3000/categories');
      const data = response.data; // Axios otomatik olarak JSON'a çevirir
  
      setState(prevState => ({
        ...prevState,
        categories: data,
        showCategories: true,
        showProducts: false,
        showFilteredProducts: false
      }));
      
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Axios, error objesinde HTTP response status'ını ve data'yı içerir
      if (error.response) {
        // İstek yapıldı ve server tarafından bir response alındı
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        // İstek yapıldı ama hiçbir response alınamadı
        console.error('Error request:', error.request);
      } else {
        // Bir şeyler isteği yaparken hatalı gitti
        console.error('Error message:', error.message);
      }
    }
  };

  
  const handleShowProducts = useCallback(async () => {
    try {
      // Axios kullanarak API'dan ürünlerin alınması
      const response = await axios.get('http://localhost:3000/products');
      const data = response.data; // Axios otomatik olarak JSON'a çevirir ve response.data içerisinde saklar
  
      setState(prevState => ({
        ...prevState,
        products: data,
        showCategories: false,
        showProducts: true,
         showFilteredProducts: false
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      // Axios, error objesinde HTTP response status'ını ve data'yı içerir
      if (error.response) {
        // İstek yapıldı ve server tarafından bir response alındı
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        // İstek yapıldı ama hiçbir response alınamadı
        console.error('Error request:', error.request);
      } else {
        // Bir şeyler isteği yaparken hatalı gitti
        console.error('Error message:', error.message);
      }
    }
  }, []); // Bağımlılıklar bu array içerisinde belirtilmelidir. Burada herhangi bir bağımlılık olmadığı varsayılmıştır.
  

  useEffect(() => {
    handleShowProducts();
    // handleShowProducts fonksiyonunu bağımlılık dizisine ekle
  }, [handleShowProducts]);

  

  const handleShowProductsByCategoryId = async (categoryId) => {
    try {
      // Kategoriye göre ürünleri filtrelemek için dinamik URL oluşturma
      let url = 'http://localhost:3000/products';
      if (categoryId) {
        url += `?category_id=${categoryId}`;
      }
  
      // Axios kullanarak API'dan veri çekme
      const response = await axios.get(url);
      const data = response.data; // Axios otomatik olarak JSON'a çevirir
  
      setState(prevState => ({
        ...prevState,
        products: data, // Yeni ürünleri eski ürünlerin üzerine yaz
        showCategories: false,
        showProducts: true,
      }));
  
    } catch (error) {
      console.error('Error fetching products by category:', error);
      // Axios hata yönetimi
      if (error.response) {
        // İstek yapıldı ve server tarafından bir response alındı
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        // İstek yapıldı ama hiçbir response alınamadı
        console.error('Error request:', error.request);
      } else {
        // Bir şeyler isteği yaparken hatalı gitti
        console.error('Error message:', error.message);
      }
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

  useEffect(() => {
    // Her sepet öğesi eklendiğinde veya kaldırıldığında toplam tutarı hesapla
    let newTotalAmount = 0;
    cart.forEach(item => {
      newTotalAmount += item.product.price * item.quantity;
    });
    setTotalAmount(newTotalAmount);
  }, [cart, setTotalAmount]);
  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.product_id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product: { id: product.product_id, name: product.product_name, price: product.price,image:product.image_url,barcode:product.barcode }, quantity: 1 }];
      }
    });
  };

  const handleAddToCart = (product) => {//Card veya Button click olunca addtocart çalışcak
    addToCart(product);
  };

  const handleSearching = useCallback((query) => {
    const formattedQuery = query.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lower case
    const wantedProducts = state.products.filter(product =>
      product.product_name.replace(/\s+/g, '').toLowerCase().includes(formattedQuery)
    );
  
    setState(prev => ({
      ...prev,
      searchQuery: query, // Keep the original query in the state to show in the input field
      wantedProduct:wantedProducts,
      showFilteredProducts: wantedProducts.length > 0
    }));
  }, [state.products]);
  

  const handleChange = useCallback((event) => {
    handleSearching(event.target.value);
  }, [handleSearching]);    



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
    setCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
    handleAddToCart,
    addToCart,
    handleSearching,
    handleChange,
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
