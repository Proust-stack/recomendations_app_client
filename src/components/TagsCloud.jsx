import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, setSelectedTags } from "../slices/tagSlice";
import { Box, Stack, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useLocation } from "react-router-dom";
import { getAllReviewsByTags } from "../slices/reviewSlice";

export default function TagsCloud() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const handleClick = (tag) => {
    dispatch(setSelectedTags(tag));
  };

  const { tags, loading, error } = useSelector((state) => state.tag);
  const { selectedTags } = useSelector((state) => state.tag);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
        padding: 3,
      }}
    >
      {!loading &&
        tags.map((tag) => (
          <Chip
            variant={selectedTags?.includes(tag) ? "filled" : "outlined"}
            key={tag}
            label={tag}
            onClick={() => handleClick(tag)}
            sx={{ cursor: "pointer" }}
            color="primary"
          />
        ))}
    </Box>
  );
}
