import React, { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import CompositionCard from "../components/CompositionCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getAllReviewsByComposition } from "../slices/reviewSlice";
import { getOneComposition } from "../slices/compositionSlice";
import ShortReviewCard from "../components/ShortReviewCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

export default function CompositionPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const { t } = useTranslation();
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid
          container
          spacing={2}
          sx={{ padding: 2 }}
          direction={matches ? "column" : "row"}
        >
          <Grid item xs={2}>
            {currentComposition && (
              <CompositionCard {...currentComposition} noLink={true} />
            )}
          </Grid>
          <Grid item xs={10}>
            {reviewsByComposition && reviewsByComposition.length ? (
              reviewsByComposition.map((review) => (
                <ShortReviewCard {...review} key={review._id} />
              ))
            ) : (
              <Typography>{t("composition_page_no_reviews")}</Typography>
            )}
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
