import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneReview } from "../slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";

export default function Reviewpage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { currentReview, loading, error } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    dispatch(getOneReview(id));
  }, []);

  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        minHeight: "100vh",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      {!loading && !error && currentReview._id && (
        <ReviewCard {...currentReview} fullText />
      )}
    </Box>
  );
}
