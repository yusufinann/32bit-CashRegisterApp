import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useGlobalContext } from "../contexts/GlobalContext";
import ProductSearchResult from "./ProductSearchResult";

const ModalSearch = ({ open, handleClose }) => {
  const { state, handleChange } = useGlobalContext();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>İsimden Ara</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Ara..."
          type="text"
          fullWidth
          variant="standard"
          value={state.searchQuery}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {state.showFilteredProducts && (
          <ProductSearchResult products={state.wantedProduct} />
        )}
      </DialogActions>
      <Button onClick={handleClose}>İptal</Button>
    </Dialog>
  );
};

export default ModalSearch;
