import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getAllReviewsByTags } from "../slices/reviewSlice";
import TagsCloud from "../components/TagsCloud";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";
import ShortReviewCard from "../components/ShortReviewCard";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: 10,
}));

export default function HomePage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { reviewsAll } = useSelector((state) => state.review);
  const { selectedTags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getAllReviewsByTags(selectedTags));
  }, [selectedTags]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid
          container
          spacing={2}
          sx={{ padding: 2 }}
          direction={matches ? "column" : "row"}
        >
          <Grid item xs={2}>
            <TagsCloud />
          </Grid>
          <Grid item xs={10}>
            <StyledBox>
              {reviewsAll &&
                reviewsAll.map((review) => (
                  <ShortReviewCard {...review} key={review._id} />
                ))}
            </StyledBox>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
