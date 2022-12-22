import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@mui/material/styles/styled";
import { ErrorBoundary } from "react-error-boundary";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";
import { getAllGames } from "../slices/gamesSlice";
import CompositionCard from "../components/CompositionCard";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  padding: 10,
}));

export default function GamesPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const { games } = useSelector((state) => state.game);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <StyledBox>
          {games &&
            games.map((game) => <CompositionCard {...game} key={game._id} />)}
        </StyledBox>
      </Suspense>
    </ErrorBoundary>
  );
}
