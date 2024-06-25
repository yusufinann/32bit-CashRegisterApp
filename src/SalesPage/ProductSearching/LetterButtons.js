import React from "react";
import { Button, Box } from "@mui/material";

const LetterButtons = ({ handleLetterClick }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <Box sx={{ display: "flex", gap: 1, margin: 2 }}>
      {alphabet.map((letter, index) => (
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
      ))}
    </Box>
  );
};

export default LetterButtons;
