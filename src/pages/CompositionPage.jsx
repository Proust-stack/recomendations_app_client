import React, { Suspense } from "react";
import { Box } from "@mui/material";
import CompositionCard from "../components/CompositionCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsByComposition } from "../slices/reviewSlice";
import { getOneComposition } from "../slices/compositionSlice";
import ShortReviewCard from "../components/ShortReviewCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
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
            flex={2}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {currentComposition && (
              <CompositionCard {...currentComposition} noLink={true} />
            )}
          </Box>
          <Box
            flex={10}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {reviewsByComposition &&
              reviewsByComposition.map((review) => (
                <ShortReviewCard {...review} key={review._id} />
              ))}
          </Box>
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
}
