import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTags,
  getAllTagsByGroup,
  setSelectedTags,
} from "../slices/tagSlice";
import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";

export default function TagsCloud({ groupId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const handleClick = (tag) => {
    dispatch(setSelectedTags(tag));
  };

  const { tags } = useSelector((state) => state.tag);
  const { selectedTags } = useSelector((state) => state.tag);
  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Chip
            key={tag}
            variant={selectedTags?.includes(tag) ? "filled" : "outlined"}
            label={tag}
            onClick={() => handleClick(tag)}
            sx={{ cursor: "pointer" }}
            color="secondary"
          />
        ))}
    </>
  );
}
