import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import { getAllReviewsByTags } from "../slices/reviewSlice";
import TagsCloud from "../components/TagsCloud";
import ShortReviewCard from "../components/ShortReviewCard";
import ErrorFallback from "../utils/errorCallback";

export default function HomePage() {
  const dispatch = useDispatch();
  const { reviewsAll, loading: reviewsLoading } = useSelector(
    (state) => state.review
  );
  const { selectedTags, loading: selectedTagsLoading } = useSelector(
    (state) => state.tag
  );

  useEffect(() => {
    dispatch(getAllReviewsByTags(selectedTags));
  }, [selectedTags]);

  return (
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
          {!reviewsLoading &&
            reviewsAll.map((review, idx) => (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ShortReviewCard {...review} idx={idx} key={review._id} />
              </ErrorBoundary>
            ))}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <TagsCloud />
      </Grid>
    </Grid>
  );
}
