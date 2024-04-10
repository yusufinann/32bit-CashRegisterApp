import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isLoggedIn: false,
    user: null,
    // other properties...
  });

  const [state, setState] = useState({
    barcode: "",
    categories: [],
    showCategories: false,
    // other properties specific to LeftSales...
  });

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
    console.log("New barcode:", newBarcode);
    // Additional logic for handling barcode change...
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
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const contextValue = {
    globalState,
    login,
    logout,
    state,
    handleBarcodeChange,

    handleShowCategories,
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
