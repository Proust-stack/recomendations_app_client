import React, { useEffect } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../slices/moviesSlice";
import CompositionCard from "../components/CompositionCard";

export default function MoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const { movies } = useSelector((state) => state.movie);
  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        minHeight: "100vh",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      {movies.map((movie) => (
        <CompositionCard {...movie} key={movie._id} />
      ))}
    </Box>
  );
}
