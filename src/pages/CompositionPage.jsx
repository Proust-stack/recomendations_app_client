import React from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import CompositionCard from "../components/CompositionCard";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsByComposition } from "../slices/reviewSlice";
import { getOneComposition } from "../slices/compositionSlice";
import ReviewCard from "../components/ReviewCard";
import ShortReviewCard from "../components/ShortReviewCard";

export default function CompositionPage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { currentComposition, loading: compositionLoading } = useSelector(
    (state) => state.composition
  );
  const { reviewsByComposition, loading: reviewsLoading } = useSelector(
    (state) => state.review
  );

  console.log(currentComposition);

  useEffect(() => {
    dispatch(getAllReviewsByComposition(id));
  }, []);
  useEffect(() => {
    dispatch(getOneComposition(id));
  }, [currentComposition]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        padding: 2,
      }}
    >
      <Box
        flex={3}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {!compositionLoading && currentComposition._id && (
          <CompositionCard {...currentComposition} noLink={true} />
        )}
      </Box>
      <Box
        flex={10}
        p={{ xs: 0, md: 2 }}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {!reviewsLoading &&
          reviewsByComposition.map((review) => (
            <ShortReviewCard {...review} key={review._id} />
          ))}
      </Box>
    </Box>
  );
}
