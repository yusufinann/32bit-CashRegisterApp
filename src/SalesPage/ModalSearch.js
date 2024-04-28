import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogActions, Box,Paper } from '@mui/material';
import { useGlobalContext } from '../contexts/GlobalContext';
import GlobalCardList from '../GlobalComponents/GlobalCardList';

const ModalSearch = ({ open, handleClose }) => {
  const { setState, state, handleChange, handleAddToCart, showAllProducts, setShowAllProducts } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const letterButtons = alphabet.map((letter, index) => (
    <Button
    key={index}
    onClick={() => handleLetterClick(letter)}
    variant="outlined"
    size="medium"
    sx={{
      borderRadius: '8px',
      fontSize: '1.2rem',              
      minWidth: '32px',
      textTransform: 'none',
    }}
  >
      {letter}
    </Button>
  ));
  const handleCloseModal = () => {
    // Arama sıfırlanıyor
    handleChange({ target: { value: '' } });

    // Tüm ürünler gösteriliyor
    setShowAllProducts(true);
    setCurrentPage(0);

    // Modal kapatılıyor
    handleClose();
  };

  const handleLetterClick = (letter) => {
    const filteredProducts = state.products.filter(product => product.product_name.startsWith(letter));
    setState(prevState => ({
      ...prevState,
      wantedProduct: filteredProducts,
      showFilteredProducts: true
    }));
    setShowAllProducts(false);
    setCurrentPage(0);
  };
  

  const handleShowAllProducts = () => {
    setShowAllProducts(true);
    setState(prevState => ({
      ...prevState,
      showFilteredProducts: false
    }));
    setCurrentPage(0);
  };
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = showAllProducts ? state.products.slice(indexOfFirstProduct, indexOfLastProduct) : state.wantedProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil((showAllProducts ? state.products.length : state.wantedProduct.length) / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="xl" sx={{ border: '2px solid #ccc', borderRadius: '8px' }}>
    <Paper elevation={3} sx={{ padding: '24px',border: '10px solid #FF6E7F'  }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🔍</span> 
          <span style={{ flex: 1 }}>Ürünleri Ara</span>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
          {letterButtons}
          <Button
            onClick={handleShowAllProducts}
            variant="contained"
            color="primary"
            size="small"
          >
            Tüm Ürünler
          </Button>
        </Box>
      </DialogTitle>
    
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Ara..."
        type="text"
        fullWidth
        variant="outlined"
        value={state.searchQuery}
        onChange={handleChange}
        InputProps={{
          sx: {
            borderRadius: '8px',
            fontSize: '0.9rem',
            '& .MuiOutlinedInput-input': {
              padding: '12px 14px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.9rem',
              background: '#ffffff',
              padding: '0 4px',
              borderRadius: '8px',
            },
          },
        }}
      />

      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          İptal
        </Button>
      </DialogActions>
      {currentProducts.length > 0 && (
        <GlobalCardList array={currentProducts} AddToCartFunction={handleAddToCart} />
      )}
      {(showAllProducts || state.showFilteredProducts) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          {pageNumbers.map(number => (
            <Button
              key={number}
              onClick={() => handlePageClick(number)}
              variant={currentPage === number ? "contained" : "outlined"}
              color="primary"
              size="small"
              sx={{
                borderRadius: '8px',
                fontSize: '0.75rem',
                padding: '4px 8px',
                minWidth: '40px',
                textTransform: 'none',
                margin: '0 2px',
              }}
            >
              {number + 1}
            </Button>
          ))}
        </Box>
      )}
      </Paper>
    </Dialog>
  );
}

export default ModalSearch;
