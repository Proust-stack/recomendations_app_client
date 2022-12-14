import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import RedditIcon from "@mui/icons-material/Reddit";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: "200px",
  padding: 1,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export default function Footer() {
  return (
    <StyledBox>
      <Box>
        <Typography>Made with Love ❤️</Typography>
        <Typography>Georgia, Tbilisi, 2022</Typography>
      </Box>
      <Stack direction="row" spacing={2} sx={{ cursor: "pointer" }}>
        <TwitterIcon />
        <InstagramIcon />
        <RedditIcon />
      </Stack>
    </StyledBox>
  );
}
