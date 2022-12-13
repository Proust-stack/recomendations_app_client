import React, { useEffect } from "react";
import RightBar from "../components/RightBar";
import { Box, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsForHomePage } from "../slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";
import TagsCloud from "../components/TagsCloud";

export default function HomePage() {
  const dispatch = useDispatch();
  const { reviewsAll, loading, error } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getAllReviewsForHomePage());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            minHeight: "100vh",
            flexWrap: "wrap",
            gap: 5,
            padding: 1,
          }}
        >
          {!loading &&
            reviewsAll.map((review, idx) => (
              <ReviewCard {...review} idx={idx} key={review._id} />
            ))}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <RightBar>
          <TagsCloud />
        </RightBar>
      </Grid>
    </Grid>
  );
}
