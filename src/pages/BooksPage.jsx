import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../slices/booksSlice";
import CompositionCard from "../components/CompositionCard";
import Grid from "@mui/material/Grid";
import TagsCloud from "../components/TagsCloud";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";
import { getAllTagsByGroup } from "../slices/tagSlice";

export default function BooksPAge() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const { books } = useSelector((state) => state.book);
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
                padding: 3,
                gap: 4,
                minHeight: "100vh",
              }}
            >
              {books &&
                books.map((book) => (
                  <CompositionCard {...book} key={book._id} />
                ))}
            </Box>
          </Grid>
          <Grid item xs={4} justify="center" p={5} sx={{ flexWrap: "wrap" }}>
            <TagsCloud groupId={books && books[0]?.group} />
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
