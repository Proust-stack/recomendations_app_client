import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { search } from "../../slices/reviewSlice";
import SearchModal from "../SearchModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "80%",
  [theme.breakpoints.up("lg")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: 10,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchComponent() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.defaultMuiPrevented = true;
      dispatch(search(query));
      setQuery("");
      handleOpen();
    }
  };
  return (
    <Search color="text.primary">
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder={t("nav_search")}
        inputProps={{ "aria-label": "search" }}
        onKeyDown={handleSearch}
      />
      <SearchModal open={open} handleClose={handleClose} />
    </Search>
  );
}
