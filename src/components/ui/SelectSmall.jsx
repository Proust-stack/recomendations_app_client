import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import i18n from "i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { changeLocale } from "../../slices/localeSlice";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({}));

export default function SelectSmall() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [lan, setLan] = React.useState("en");

  const handleChange = (event) => {
    dispatch(changeLocale({ locale: event.target.value }));
    i18n.changeLanguage(event.target.value);
    setLan(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: 3 }}>
      <LanguageIcon color="secondary" sx={{ mr: 1 }} />
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={lan}
        onChange={handleChange}
        variant="standard"
        autoWidth
        sx={{ border: "none", display: "flex", justifyContent: "center" }}
      >
        <StyledMenuItem value={"en"}>
          <Typography>
            {matches ? (
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/us.png`}
                srcSet={`https://flagcdn.com/w40/us.png 2x`}
                alt="en"
              />
            ) : (
              <span>English</span>
            )}
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem value={"ge"}>
          <Typography>
            {matches ? (
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/ge.png`}
                srcSet={`https://flagcdn.com/w40/ge.png 2x`}
                alt=""
              />
            ) : (
              <span>ქართული</span>
            )}
          </Typography>
        </StyledMenuItem>
      </Select>
    </Box>
  );
}
