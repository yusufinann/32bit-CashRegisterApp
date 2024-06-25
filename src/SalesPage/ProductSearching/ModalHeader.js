import React from "react";
import { Button, Box } from "@mui/material";

const ModalHeader = ({ handleShowFavorites, handleShowAllProducts, letterButtons,t }) => {

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>🔍</span>
        <span style={{ flex: 1 }}>{t('Search Products')}</span>
      </Box>
      <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
        <Button
          onClick={handleShowFavorites}
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(to right, #f6d365, #fda085)",
            color: "black",
            borderRadius: "8px",
            fontWeight: "bold",
            margin: 2
          }}
        >
          {t('Favorites')}
        </Button>
        {letterButtons}
        <Button
          onClick={handleShowAllProducts}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            background: "linear-gradient(to right, #f6d365, #fda085)",
            color: "black",
            borderRadius: "8px",
            fontWeight: "bold",
            margin: 2
          }}
        >
          {t('All Products')}
        </Button>
      </Box>
    </>
  );
};

export default ModalHeader;
