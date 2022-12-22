import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@mui/material/styles/styled";
import { ErrorBoundary } from "react-error-boundary";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getAllBooks } from "../slices/booksSlice";
import CompositionCard from "../components/CompositionCard";
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

export default function BooksPAge() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const { books } = useSelector((state) => state.book);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <StyledBox>
          {books &&
            books.map((book) => <CompositionCard {...book} key={book._id} />)}
        </StyledBox>
      </Suspense>
    </ErrorBoundary>
  );
}
