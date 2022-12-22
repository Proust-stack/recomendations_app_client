import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setUserRating } from "../../slices/compositionSlice";

export default function UserRating({ compositionId }) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        display: "flex",
        justifyContent: "flex-end",
        padding: 1,
      }}
    >
      <Rating
        name="simple-controlled"
        size="small"
        value={value}
        onChange={(event, newValue) => {
          dispatch(setUserRating({ userRating: newValue, compositionId }));
          setValue(newValue);
        }}
      />
    </Box>
  );
}
