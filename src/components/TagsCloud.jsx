import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../slices/tagSlice";
import { Box, Stack, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TagsCloud() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const { tags, loading, error } = useSelector((state) => state.tag);
  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        minHeight: "100vh",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      {!loading &&
        tags.map((tag) => (
          <Typography variant="subtitle1" key={tag}>
            {tag}
          </Typography>
        ))}
    </Box>
  );
}
