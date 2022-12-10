import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { getAllGroups } from "../slices/groupSlice";

const pages = [
  { genre: "nav_home", path: "/" },
  { genre: "nav_movies", path: "movies" },
  { genre: "nav_books", path: "books" },
  { genre: "nav_games", path: "games" },
];

const StyledBox = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    ml: 2,
  },
}));

export default function NavLinks() {
  const [tabValue, setTabValue] = React.useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tabHandleChange = (e, value) => {
    setTabValue(value);
  };

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  return (
    <StyledBox>
      <Tabs
        value={tabValue}
        onChange={tabHandleChange}
        aria-label="nav tabs"
        textColor="secondary"
      >
        {pages.map((page) => (
          <Tab
            label={t(page.genre)}
            to={page.path}
            component={Link}
            color="text.primary"
            key={page.path}
          />
        ))}
      </Tabs>
    </StyledBox>
  );
}
