import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isLoggedIn: false,
    user: null,
    // other properties...
  });

  const [paymentType, setPaymentType] = useState("");
  const [campaignProducts, setCampaignProducts] = useState([]);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredCampaignProducts, setFilteredCampaignProducts] = useState([]); //kampanya listesinde filtreleme işlemi için
  //const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); //VirtualKeyboard
  const [keyboardPosition, setKeyboardPosition] = useState({ x: 0, y: 0 }); //VirtualKeyboard
  const [showAllProducts, setShowAllProducts] = useState(false); //ModalSearch
  const [partialPayment, setPartialPayment] = useState(false); //PaymentModal - Receipt
  const [loading, setLoading] = useState(false); // Yükleme durumu eklendi
  const [error, setError] = useState(false);
  
  const [openCampaignModal, setOpenCampaignModal] = useState(false);

  const [state, setState] = useState({
    // LeftSales için state
    barcode: "",
    searchQuery: "",
    categories: [],
    showCategories: false,
    showProducts: false,
    showSubcategories: false, //AltKategorileri gösterip göstermeme durumu için
    showFilteredProducts: false,
    products: [],
    filteredProducts: [], // Filtrelenmiş ürünleri saklamak için
    wantedProduct: [],
    subcategories: [], //Altkategoriler için
  });

  const handleBarcodeChange = async (event) => {
    const newBarcode = event.target.value;
    // If the barcode input is empty, reset the relevant parts of the state
    if (!newBarcode.trim()) {
      setState((prevState) => ({
        ...prevState,
        barcode: "",
        filteredProducts: [],
        showCategories: false,
        showProducts: true,
        showFilteredProducts: false,
      }));
      return; // Early exit if barcode input is empty
    }

    try {
      // Fetch products from the backend based on the barcode
      const response = await axios.get(
        `http://localhost:3000/products?barcode=${newBarcode}`
      );
      const filteredProducts = response.data; // Assumes 'data' directly contains the product list

      // // If a product is found, add it to the cart
      // if (filteredProducts.length > 0) {
      //     const productToAdd = filteredProducts[0];
      //     addToCart(productToAdd); // This function needs to be implemented
      // }

      // Update state with the new data
      setState((prevState) => ({
        ...prevState,
        barcode: newBarcode,
        filteredProducts: filteredProducts,
        showCategories: false,
        showSubcategories: false,
        showProducts: filteredProducts.length === 0,
        showFilteredProducts: filteredProducts.length > 0,
      }));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Update state to reflect the error situation
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
  };

  const handleSearching = useCallback(
    (query) => {
      // Boşlukları kaldır ve küçük harfe dönüştür
      const formattedQuery = query.trim().toLowerCase();

      // Sorguya göre ürünleri filtrele
      const wantedProducts = state.products.filter((product) =>
        product.product_name.toLowerCase().startsWith(formattedQuery)
      );

      // Durum güncellemesi tek bir setState çağrısı ile yapılabilir
      setState((prev) => ({
        ...prev,
        searchQuery: query,
        wantedProduct: wantedProducts,
      }));

      // ModalSearch'te tüm ürünler gösterildiğinde isme göre arama alanını kapat
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

  const fetchFromAPI = async (endpoint) => {
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      const data = response.data;
      console.log(`Fetched from API: ${endpoint}`);
      return data;
    } catch (error) {
      setError(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  let categoriesData = null;
  const handleShowCategories = useCallback(async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        if (!categoriesData) {
          const data = await fetchFromAPI("categories");
          categoriesData = data;
          console.log("Fetched categories");
        }
        updateStateAndKeyboard(true, false, false, false, {
          categories: categoriesData,
        });
        console.log("Categories already loaded.");
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(true);
    }
  }, []);

  let productsData = null;

  const handleShowProducts = useCallback(async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        if (!productsData) {
          const data = await fetchFromAPI("products");
          productsData = data;
          console.log("Fetched products");
        }
        updateStateAndKeyboard(false, true, false, false, {
          products: productsData,
        });
        console.log("Products already loaded.");
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(true);
    }
  }, []);
  //AltKategorileri getiren fonksiyon.
  let subcategoriesData = null;
  const handleSubCategoriesClick = useCallback(async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        if (!subcategoriesData) {
          const data = await fetchFromAPI("subcategories");
          subcategoriesData = data;
          console.log("Fetched subcategories");
        } else {
          console.log("Subcategories already loaded.");
        }
        updateStateAndKeyboard(false, false, false, true, {
          subcategories: subcategoriesData,
        });
        console.log("Subcategories already loaded.");
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(true);
    }
  }, []);
  const handleShowSubcategoryByCategoryId = async (categoryId) => {
    try {
      // Kategoriye göre alt kategorileri filtrelemek için dinamik URL oluşturma
      let url = "http://localhost:3000/subcategories";
      if (categoryId) {
        url += `?category_id=${categoryId}`;
      }

      // Axios kullanarak API'dan veri çekme
      const response = await axios.get(url);
      const data = response.data; // Axios otomatik olarak JSON'a çevirir

      setState((prevState) => ({
        ...prevState,
        subcategories: data, // Yeni ürünleri eski ürünlerin üzerine yaz
        showCategories: false,
        showProducts: false,
        showSubcategories: true,
      }));
    } catch (error) {
      console.error("Error fetching subcategories by category:", error);
      // Axios hata yönetimi
      if (error.response) {
        // İstek yapıldı ve server tarafından bir response alındı
        console.error(
          "Error response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // İstek yapıldı ama hiçbir response alınamadı
        console.error("Error request:", error.request);
      } else {
        // Bir şeyler isteği yaparken hatalı gitti
        console.error("Error message:", error.message);
      }
    }
  };

  const updateStateAndKeyboard = (
    showCategories,
    showProducts,
    showFilteredProducts,
    showSubcategories,
    extraState = {}
  ) => {
    setState((prevState) => ({
      ...prevState,
      showCategories,
      showProducts,
      showFilteredProducts,
      showSubcategories, //AltKategoriler için
      ...extraState,
    }));
    setIsKeyboardOpen(false);
  };

  const handleShowProductsBySubcategory = async (subcategories) => {
    //handleShowProductsByCategoryId
    try {
      // Kategoriye göre ürünleri filtrelemek için dinamik URL oluşturma
      let url = "http://localhost:3000/products";
      if (subcategories) {
        url += `?subcategories=${subcategories}`;
      }

      // Axios kullanarak API'dan veri çekme
      const response = await axios.get(url);
      const data = response.data; // Axios otomatik olarak JSON'a çevirir

      setState((prevState) => ({
        ...prevState,
        products: data, // Yeni ürünleri eski ürünlerin üzerine yaz
        showCategories: false,
        showProducts: true,
        showSubcategories: false,
      }));
    } catch (error) {
      console.error("Error fetching products by category:", error);
      // Axios hata yönetimi
      if (error.response) {
        // İstek yapıldı ve server tarafından bir response alındı
        console.error(
          "Error response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // İstek yapıldı ama hiçbir response alınamadı
        console.error("Error request:", error.request);
      } else {
        // Bir şeyler isteği yaparken hatalı gitti
        console.error("Error message:", error.message);
      }
    }
  };

  const handleShowCampaignProducts = async () => {
    try {
      // Fetch products that are part of a campaign
      const response = await axios.get(
        "http://localhost:3000/products?campaign_state=1"
      );
      // Setting the campaignProducts state with data from the response
      setCampaignProducts(response.data);
    } catch (error) {
      console.error("Error fetching campaign products:", error);
      // Handle different error scenarios
      if (error.response) {
        console.error(
          "Error response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const removeFromCampaignProducts = (productId) => {
    // Filter out the product to be removed by its ID
    setCampaignProducts((prevCampaignProducts) =>
      prevCampaignProducts.filter((product) => product.product_id !== productId)
    );
  };

  //kampanya listesinde filtreleme işlemi için
  const handleCampaignFilter = (campaignId) => {
    if (campaignId === "ALL") {
      setFilteredCampaignProducts(campaignProducts); // Show all products if no filter is selected
    } else {
      const filtered = campaignProducts.filter(
        (product) => product.campaign_id === campaignId
      );
      setFilteredCampaignProducts(filtered);
    }
  };

  useEffect(() => {
    handleCampaignFilter("ALL"); // Default to showing all products
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

    state, // LeftSales state
    setState, //
    handleBarcodeChange,
    handleShowCategories,
    handleShowProducts,
    handleShowProductsBySubcategory,

    handleSearching,
    handleChange,
    //  selectedProducts,
    campaignProducts, //
    handleShowCampaignProducts,
    removeFromCampaignProducts,
    handleCampaignFilter,
    filteredCampaignProducts,

    paymentType,
    setPaymentType,

    setIsKeyboardOpen, //VirtualKeyboard
    isKeyboardOpen, //VirtualKeyboard
    keyboardPosition,
    setKeyboardPosition, //VirtualKeyboard
    showAllProducts,
    setShowAllProducts, //ModalSearch
    handleSubCategoriesClick,
    handleShowSubcategoryByCategoryId,
    partialPayment,
    setPartialPayment, //Calculator-PaymentModal-Receipt
    openCampaignModalFn,closeCampaignModalFn,openCampaignModal,
    loading,
    error
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