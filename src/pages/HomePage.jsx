import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import { getAllReviewsByTags } from "../slices/reviewSlice";
import TagsCloud from "../components/TagsCloud";
import ShortReviewCard from "../components/ShortReviewCard";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

export default function HomePage() {
  const dispatch = useDispatch();
  const { reviewsAll } = useSelector((state) => state.review);
  const { selectedTags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getAllReviewsByTags(selectedTags));
  }, [selectedTags]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
                padding: 3,
              }}
            >
              {reviewsAll &&
                reviewsAll.map((review, idx) => (
                  <ShortReviewCard {...review} idx={idx} key={review._id} />
                ))}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <TagsCloud />
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
