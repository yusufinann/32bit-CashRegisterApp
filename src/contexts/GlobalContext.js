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
  const [campaignProducts,setCampaignProducts]=useState([]);
  const [openCampaignModal, setOpenCampaignModal] = useState(false);
  const [filteredCampaignProducts, setFilteredCampaignProducts] = useState([]);

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
    // If the barcode input is empty, reset the relevant parts of the state
    if (!newBarcode.trim()) {
        setState(prevState => ({
            ...prevState,
            barcode: '',
            filteredProducts: [],
            showCategories: false,
            showProducts: true,
            showFilteredProducts: false
        }));
        return; // Early exit if barcode input is empty
    }
    
    try {
        // Fetch products from the backend based on the barcode
        const response = await axios.get(`http://localhost:3000/products?barcode=${newBarcode}`);
        const filteredProducts = response.data; // Assumes 'data' directly contains the product list

        // If a product is found, add it to the cart
        if (filteredProducts.length > 0) {
            const productToAdd = filteredProducts[0];
            addToCart(productToAdd); // This function needs to be implemented
        }

        // Update state with the new data
        setState(prevState => ({
            ...prevState,
            barcode: newBarcode,
            filteredProducts: filteredProducts,
            showCategories: false,
            showProducts: filteredProducts.length === 0,
            showFilteredProducts: filteredProducts.length > 0
        }));

    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Update state to reflect the error situation
        setState(prevState => ({
            ...prevState,
            barcode: newBarcode,
            filteredProducts: [],
            showCategories: false,
            showProducts: true,
            showFilteredProducts: false
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
            // Update quantity
            let newQuantity = existingItem.quantity + 1;
            let newPrice = existingItem.product.price;

            // Implement campaign C001: 3 for 2 offer
            if (product.campaign_id === 'C001') {
                const groupsOfThree = Math.floor(newQuantity / 3);
                const remainder = newQuantity % 3;
                newPrice = (groupsOfThree * 2 * existingItem.product.price) + (remainder * existingItem.product.price);
            }

            // Implement campaign C002: 50% discount
            else if (product.campaign_id === 'C002') {
                newPrice = existingItem.product.price * 0.5 * newQuantity;
            }

            // Implement campaign C003: 10% discount
            else if (product.campaign_id === 'C003') {
                newPrice = existingItem.product.price * 0.9 * newQuantity;
            }

            return prevCart.map((item) =>
                item.product.id === product.product_id ? { ...item, quantity: newQuantity, totalPrice: newPrice } : item
            );
        } else {
            // Adding a new item to the cart
            let initialPrice = product.price;

            // Check if the product addition should apply C001 offer
            if (product.campaign_id === 'C001' && product.quantity === 3) {
                initialPrice = product.price * 2; // Pay for 2 even though it's 3
            }

            // Apply C002: 50% discount on first addition
            else if (product.campaign_id === 'C002') {
                initialPrice = product.price * 0.5;
            }

            // Apply C003: 10% discount on first addition
            else if (product.campaign_id === 'C003') {
                initialPrice = product.price * 0.9;
            }

            return [
                ...prevCart,
                {
                    product: {
                        id: product.product_id,
                        name: product.product_name,
                        price: product.price,
                        image: product.image_url,
                        barcode: product.barcode,
                        campaign_id: product.campaign_id,
                        vat_rate:product.vat_rate
                    },
                    quantity: 1,
                    totalPrice: initialPrice
                }
            ];
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

  const calculateTotalPrice = (item) => {
    let totalCost = item.quantity * item.product.price;

    // Apply different campaigns based on the campaign ID
    switch (item.product.campaign_id) {
      case 'C001':
        // Campaign C001: "Buy 3, pay for 2"
        const numberOfFullDiscounts = Math.floor(item.quantity / 3);
        const numberOfPaidItems = item.quantity - numberOfFullDiscounts;
        totalCost = numberOfPaidItems * item.product.price;
        break;
      case 'C002':
        // Campaign C002: 50% discount
        totalCost = item.quantity * item.product.price * 0.5;
        break;
      case 'C003':
        // Campaign C003: 10% discount
        totalCost = item.quantity * item.product.price * 0.9;
        break;
      default:
        // No campaign, regular price
        totalCost = item.quantity * item.product.price;
        break;
    }

    return totalCost;
  };
  
  const [input, setInput] = useState("");
  const handleClick = (value) => setInput((prevInput) => prevInput + value);
  const handleClear = () => setInput("");
  const handleDeleteOne = () => {
    setInput((prevInput) => {
      if (prevInput === "") return prevInput;
      return prevInput.slice(0, -1);
    });
  };

  const handleShowCampaignProducts = async () => {
    try {
      // Fetch products that are part of a campaign
      const response = await axios.get('http://localhost:3000/products?campaign_state=1');
      // Setting the campaignProducts state with data from the response
      setCampaignProducts(response.data);
    } catch (error) {
      console.error('Error fetching campaign products:', error);
      // Handle different error scenarios
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
   //kampanya listesinde filtreleme işlemi için
   const handleCampaignFilter = (campaignId) => {
    if (campaignId === 'ALL') {
      setFilteredCampaignProducts(campaignProducts); // Show all products if no filter is selected
    } else {
      const filtered = campaignProducts.filter(product => product.campaign_id === campaignId);
      setFilteredCampaignProducts(filtered);
    }
  };
  useEffect(() => {
    handleCampaignFilter('ALL'); // Default to showing all products
  }, [campaignProducts]);


  const openCampaignModalFn = () => {
    setOpenCampaignModal(true);
    handleShowCampaignProducts();
};

const closeCampaignModalFn = () => {
  setOpenCampaignModal(false);
  handleCampaignFilter('ALL'); // Reset filter when closing
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
    setCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
    handleAddToCart,
    addToCart,
    handleSearching,
    handleChange,
    calculateTotalPrice,
    input, setInput, handleClick, handleClear, handleDeleteOne ,
    handleShowCampaignProducts,
    openCampaignModal,
    openCampaignModalFn,
    closeCampaignModalFn,
    handleAddToCart,
    handleCampaignFilter,
    filteredCampaignProducts
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
