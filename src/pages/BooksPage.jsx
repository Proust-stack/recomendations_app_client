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
              p={{ xs: 0, md: 2 }}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
                minHeight: "100vh",
              }}
            >
              {books &&
                books.map((book) => (
                  <CompositionCard {...book} key={book._id} />
                ))}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <TagsCloud groupId={books && books[0]?.group} />
            </Box>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
