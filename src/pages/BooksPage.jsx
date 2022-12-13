import React, { useEffect, useState } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../slices/booksSlice";
import CompositionCard from "../components/CompositionCard";
import Grid from "@mui/material/Grid";
import RightBar from "../components/RightBar";
import TagsCloud from "../components/TagsCloud";

export default function BooksPAge() {
  const [userRating, setUserRating] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const { books, loading, error } = useSelector((state) => state.book);
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box
          p={{ xs: 0, md: 2 }}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            minHeight: "100vh",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          {!loading &&
            !error &&
            books.map((book) => <CompositionCard {...book} key={book._id} />)}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <RightBar>
          <TagsCloud />
        </RightBar>
      </Grid>
    </Grid>
  );
}
