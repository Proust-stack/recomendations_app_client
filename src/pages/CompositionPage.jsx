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

export default function CompositionPage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { currentComposition } = useSelector((state) => state.composition);
  const { reviewsByComposition } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getAllReviewsByComposition(id));
  }, []);
  useEffect(() => {
    dispatch(getOneComposition(id));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {currentComposition._id && <CompositionCard {...currentComposition} />}
      </Grid>
      <Grid item xs={8}>
        <Box
          flex={4}
          p={{ xs: 0, md: 2 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "100vh",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          {reviewsByComposition.map((review) => (
            <ReviewCard {...review} key={review._id} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
