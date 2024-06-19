import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Paper,
} from "@mui/material";
import { useGlobalContext } from "../contexts/GlobalContext";
import GlobalCardList from "../GlobalComponents/GlobalCardList";
import { useCartContext } from "../contexts/CartContext";
import FavoritesList from "./FavoritesList";
import './styles.css'
const ModalSearch = ({ open, handleClose,appTheme}) => {
  const { setState, state, handleChange, showAllProducts, setShowAllProducts } = useGlobalContext();
  const { handleAddToCart } = useCartContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const productsPerPage = 10;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const letterButtons = alphabet.map((letter, index) => (
    <Button
      key={index}
      onClick={() => handleLetterClick(letter)}
      variant="outlined"
      size="medium"
      sx={{
        borderRadius: "8px",
        fontSize: "1.2rem",
        minWidth: "32px",
        textTransform: "none",
      }}
    >
      {letter}
    </Button>
  ));

  const handleCloseModal = () => {
    setShowAllProducts(true);
    setCurrentPage(0);
    handleClose();
  };

  const handleLetterClick = (letter) => {
    const filteredProducts = state.products.filter((product) =>
      product.product_name.startsWith(letter)
    );
    setState((prevState) => ({
      ...prevState,
      wantedProduct: filteredProducts,
      showFilteredProducts: true,
    }));
    setShowAllProducts(false);
    setShowFavorites(false);
    setCurrentPage(0);
  };

  const handleShowAllProducts = () => {
    setShowAllProducts(true);
    setState((prevState) => ({
      ...prevState,
      showFilteredProducts: false,
    }));
    setCurrentPage(0);
    setShowFavorites(false);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchingChange = (event) => {
    const value = event.target.value;
    handleChange({ target: { value } });
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = showAllProducts
    ? state.products.slice(indexOfFirstProduct, indexOfLastProduct)
    : state.wantedProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (
    let i = 0;
    i <
    Math.ceil(
      (showAllProducts ? state.products.length : state.wantedProduct.length) /
        productsPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.product_id === product.product_id)) {
        return prevFavorites.filter((fav) => fav.product_id !== product.product_id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const handleFavorites = (event, product) => {
    event.stopPropagation();
    addToFavorites(product);
    console.log("Toggled favorite:", product);
  };

  const handleShowFavorites = () => {
    setState((prevState) => ({
      ...prevState,
      wantedProduct: [],
      showFilteredProducts: false,
    }));
    setShowFavorites(true);
    setShowAllProducts(false);
    setCurrentPage(0);
  };

  useEffect(() => {
    const favoriteIds = favorites.map(fav => fav.product_id);
    setState((prevState) => ({
      ...prevState,
      favoriteIds: favoriteIds
    }));
  }, [favorites, setState]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="xl"
      sx={{ border: "2px solid #ccc", borderRadius: "8px" }}
    >
      <Paper elevation={3} sx={{ padding: "24px", border: appTheme==='dark' ? '10px solid purple':'10px solid #FF6E7F' ,backgroundColor:appTheme==='dark' ? '#3C3C3C':'white',color: appTheme === 'dark' ? 'white' : 'black'}}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
              🔍
            </span>
            <span style={{ flex: 1 }}>Search Products</span>
          </Box>
          <Box sx={{ display: "flex", gap: 1, marginTop: 2}}>
            <Button
              onClick={handleShowFavorites}
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(to right, #f6d365, #fda085)",
                color: "black",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Favorites
            </Button>
            {letterButtons}
            <Button
              onClick={handleShowAllProducts}
              variant="contained"
              color="primary"
              size="small"
            >
              All Products
            </Button>
          </Box>
        </DialogTitle>

        <TextField
          id="searching"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleSearchingChange}
          InputProps={{
            sx: {
              borderRadius: "8px",
              fontSize: "0.9rem",
              "& .MuiOutlinedInput-input": {
                padding: "12px 14px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.9rem",
                background: "#ffffff",
                padding: "0 4px",
                borderRadius: "8px",
              },
            },
          }}
        />

        <DialogActions>
        <Button onClick={handleClose} sx={{ color: appTheme === 'dark' ? 'white' : 'black' }} variant="outlined">
  İptal
</Button>

        </DialogActions>

        {currentProducts.length > 0 && (
          <GlobalCardList
            array={currentProducts}
            AddToCartFunction={handleAddToCart}
            handleFavorites={handleFavorites}
            favoriteIds={state.favoriteIds}
          />
        )}

        {(showAllProducts || state.showFilteredProducts) && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            {pageNumbers.map((number) => (
              <Button
                key={number}
                onClick={() => handlePageClick(number)}
                variant={currentPage === number ? "contained" : "outlined"}
                color="primary"
                size="small"
                sx={{
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  minWidth: "40px",
                  textTransform: "none",
                  margin: "0 2px",
                }}
              >
                {number + 1}
              </Button>
            ))}
          </Box>
        )}
        {showFavorites && (
         <div className="centered-container">
         <FavoritesList favorites={favorites} handleFavorites={handleFavorites} appTheme={appTheme} />
       </div>
        )}
      </Paper>
    </Dialog>
  );
};

export default ModalSearch;