import React, { useEffect, useState } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../slices/booksSlice";
import CompositionCard from "../components/CompositionCard";

export default function BooksPAge() {
  const [userRating, setUserRating] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const { books } = useSelector((state) => state.book);
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
      {books &&
        books.map((book) => <CompositionCard {...book} key={book._id} />)}
    </Box>
  );
}
