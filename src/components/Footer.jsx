import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Made with Love ❤️</Typography>
      <Typography>Georgia, Tbilisi, 2022</Typography>
    </Box>
  );
}
