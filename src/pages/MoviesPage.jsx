import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
import { ErrorBoundary } from "react-error-boundary";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getAllMovies } from "../slices/moviesSlice";
import CompositionCard from "../components/CompositionCard";
import TagsCloud from "../components/TagsCloud";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  padding: 10,
}));

export default function MoviesPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const { movies } = useSelector((state) => state.movie);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <StyledBox>
          {movies &&
            movies.map((movie) => (
              <CompositionCard {...movie} key={movie._id} />
            ))}
        </StyledBox>
      </Suspense>
    </ErrorBoundary>
  );
}
