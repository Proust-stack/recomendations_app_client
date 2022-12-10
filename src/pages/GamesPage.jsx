import React, { useEffect } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../slices/gamesSlice";
import CompositionCard from "../components/CompositionCard";

export default function GamesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const { games } = useSelector((state) => state.game);
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
      {games.map((game) => (
        <CompositionCard {...game} key={game._id} />
      ))}
    </Box>
  );
}
