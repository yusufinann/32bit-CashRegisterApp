import React, { useState } from "react";
import {
  Button,
  Paper,
} from "@mui/material";
import GlobalCardList from "../../GlobalComponents/GlobalCardList";
import FavoritesList from "../FavoritesList";
import LetterButtons from "./LetterButtons";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ModalHeader from "./ModalHeader";
import useFavorites from "./useFavorites";
import { getPageNumbers, getCurrentProducts, filterProductsByLetter } from "./utils";
import '../styles.css';

const ModalSearch = ({ open, handleClose, theme,t,handleAddToCart,setState, state, handleChange, showAllProducts, setShowAllProducts ,handleShowProducts }) => {
  
  const [currentPage, setCurrentPage] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, addToFavorites] = useFavorites();
  const productsPerPage = 10;

  const handleLetterClick = (letter) => {
    const filteredProducts = filterProductsByLetter(state.products, letter);
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
    handleShowProducts();
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

  const currentProducts = showAllProducts
    ? getCurrentProducts(state.products, currentPage, productsPerPage)
    : getCurrentProducts(state.wantedProduct, currentPage, productsPerPage);

  const pageNumbers = getPageNumbers(
    showAllProducts ? state.products.length : state.wantedProduct.length,
    productsPerPage
  );

  const handleFavorites = (event, product) => {
    event.stopPropagation();
    addToFavorites(product);
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

  if (!open) {
    return null; // Render nothing if not open
  }

  return (
    <div className="modal-container">
      <Paper elevation={3} sx={{ padding: "24px", border: theme === 'dark' ? '10px solid purple' : '10px solid #FF6E7F', backgroundColor: theme === 'dark' ? '#3C3C3C' : 'white', color: theme === 'dark' ? 'white' : 'black', maxWidth: "90%", borderRadius: "8px" }}>
        <ModalHeader
          handleShowFavorites={handleShowFavorites}
          handleShowAllProducts={handleShowAllProducts}
          letterButtons={<LetterButtons handleLetterClick={handleLetterClick} 
          />}
          t={t}
        />

        <SearchBar handleSearchingChange={handleSearchingChange} 
          setShowFavorites={setShowFavorites}/>

        <div className="modal-actions">
          <Button onClick={handleClose} sx={{ color: theme === 'dark' ? 'white' : 'black' ,backgroundColor: theme === 'dark' ? 'purple' : '#FF6E7F',margin:2 }} variant="outlined">
            {t('Cancel')}
          </Button>
        </div>

        {currentProducts.length > 0 && (
          <GlobalCardList
            array={currentProducts}
            AddToCartFunction={handleAddToCart}
            handleFavorites={handleFavorites}
            favoriteIds={state.favoriteIds}
          />
        )}

        {(showAllProducts || state.showFilteredProducts) && (
          <Pagination
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            pageNumbers={pageNumbers}
          />
        )}
        {showFavorites && (
          <div className="centered-container">
            <FavoritesList favorites={favorites} handleFavorites={handleFavorites} theme={theme} />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ModalSearch;
