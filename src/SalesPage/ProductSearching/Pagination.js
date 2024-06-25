import React from "react";
import { Button, Box } from "@mui/material";

const Pagination = ({ currentPage, handlePageClick, pageNumbers }) => {
  const maxPageButtons = 20; // Maximum number of page buttons to display at a time

  const getVisiblePageNumbers = () => {
    const totalPages = pageNumbers.length;
    let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons);
    
    if (endPage - startPage < maxPageButtons) {
      startPage = Math.max(0, endPage - maxPageButtons);
    }
    
    return pageNumbers.slice(startPage, endPage);
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
      <Button
        onClick={() => handlePageClick(Math.max(0, currentPage - 1))}
        variant="outlined"
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
        disabled={currentPage === 0}
      >
        Previous
      </Button>
      {visiblePageNumbers.map((number) => (
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
      <Button
        onClick={() => handlePageClick(Math.min(pageNumbers.length - 1, currentPage + 1))}
        variant="outlined"
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
        disabled={currentPage === pageNumbers.length - 1}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
