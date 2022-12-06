import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { changeLocale } from "../../slices/localeSlice";
import i18n from "i18next";

export default function SelectSmall() {
  const dispatch = useDispatch();
  const [lan, setLan] = React.useState("en");

  const handleChange = (event) => {
    dispatch(changeLocale({ locale: event.target.value }));
    i18n.changeLanguage(event.target.value);
    setLan(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
      <LanguageIcon color="secondary" sx={{ mr: 1 }} />
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={lan}
        label="Age"
        onChange={handleChange}
        sx={{ textDecoration: "none" }}
        variant="standard"
      >
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"ge"}>ქართული</MenuItem>
      </Select>
    </Box>
  );
}
