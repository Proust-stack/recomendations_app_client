import React, { Suspense } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import { getOneReview } from "../slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";
import CompositionCard from "../components/CompositionCard";
import UserRating from "../components/ui/UserRating";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";
import { hasRated } from "../utils/hasUserRated";
import { getOneComposition } from "../slices/compositionSlice";

export default function Reviewpage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { currentReview } = useSelector((state) => state.review);
  const { currentUser } = useSelector((state) => state.user);
  const { currentComposition } = useSelector((state) => state.composition);

  useEffect(() => {
    dispatch(getOneReview(id)).then(() => {
      dispatch(getOneComposition(currentReview.composition._id));
    });
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs="auto">
            {currentReview && (
              <CompositionCard {...currentReview.composition} noLink={true} />
            )}
          </Grid>
          <Grid item xs={10}>
            {currentUser &&
            currentComposition &&
            !hasRated(currentComposition.usersRating, currentUser._id) ? (
              <UserRating compositionId={currentComposition._id} />
            ) : null}
            <Box>{currentReview && <ReviewCard {...currentReview} />}</Box>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
