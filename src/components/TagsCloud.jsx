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
    groupId && dispatch(getAllTagsByGroup(groupId));
    !groupId && dispatch(getAllTags());
  }, [groupId]);

  const handleClick = (tag) => {
    dispatch(setSelectedTags(tag));
  };

  const { tags } = useSelector((state) => state.tag);
  const { selectedTags } = useSelector((state) => state.tag);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
        padding: 1,
        maxWidth: "100%",
      }}
    >
      {tags &&
        tags.map((tag) => (
          <Chip
            key={tag}
            variant={selectedTags?.includes(tag) ? "filled" : "outlined"}
            label={tag}
            onClick={() => handleClick(tag)}
            sx={{ cursor: "pointer" }}
            color="primary"
          />
        ))}
    </Box>
  );
}
