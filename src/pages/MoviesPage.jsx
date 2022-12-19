import React, { Suspense, useEffect } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../slices/moviesSlice";
import CompositionCard from "../components/CompositionCard";
import Grid from "@mui/material/Grid";
import TagsCloud from "../components/TagsCloud";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

export default function MoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const { movies } = useSelector((state) => state.movie);
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
              {movies &&
                movies.map((movie) => (
                  <CompositionCard {...movie} key={movie._id} />
                ))}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <TagsCloud groupId={movies && movies[0]?.group} />
            </Box>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
