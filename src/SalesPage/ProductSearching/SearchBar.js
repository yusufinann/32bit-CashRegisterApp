import React from "react";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleSearchingChange }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <InputBase
        id="searching"
        fullWidth
        placeholder="Ara..."
        onChange={handleSearchingChange}
        sx={{ ml: 1, flex: 1, fontSize: "0.9rem" }}
      />
      
        <SearchIcon />
      
    </Paper>
  );
};

export default SearchBar;
