import React, { Suspense } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import { getOneReview } from "../slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";
import { getAllCompositions } from "../slices/compositionSlice";
import CompositionCard from "../components/CompositionCard";
import UserRating from "../components/ui/UserRating";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

export default function Reviewpage() {
  const dispatch = useDispatch();
  const [rated, setRated] = React.useState(false);
  let { id } = useParams();
  const { currentReview, loading, error } = useSelector(
    (state) => state.review
  );
  const { currentUser } = useSelector((state) => state.user);

  // const { currentComposition, loading: compositionLoading } = useSelector(
  //   (state) => state.composition
  // );

  useEffect(() => {
    dispatch(getOneReview(id));
  }, []);

  useEffect(() => {
    dispatch(getAllCompositions());
  }, []);

  // useEffect(() => {
  //   dispatch(getOneComposition(id));
  // }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid container spacing={2} sx={{ padding: 2, minHeight: "100vh" }}>
          <Grid item xs={2}>
            {currentReview && (
              <CompositionCard {...currentReview.composition} noLink={true} />
            )}
          </Grid>
          <Grid item xs={10}>
            {currentUser && !rated && currentReview ? (
              <UserRating
                compositionId={currentReview.composition._id}
                setRated={setRated}
              />
            ) : null}
            <Box sx={{ alignSelf: "stretch", justifySelf: "stretch" }}>
              {currentReview && <ReviewCard {...currentReview} />}
            </Box>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
