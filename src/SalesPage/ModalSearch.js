import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const ModalSearch = ({ open, handleClose }) => {

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
        />
      </DialogContent>
      <DialogActions>
        <Button>İptal</Button>
      </DialogActions>
      {/* Area where products are displayed */}
    </Dialog>
  );
}

export default ModalSearch;
