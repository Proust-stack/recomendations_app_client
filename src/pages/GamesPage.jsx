import React, { useEffect } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../slices/gamesSlice";
import CompositionCard from "../components/CompositionCard";
import Grid from "@mui/material/Grid";
import RightBar from "../components/RightBar";
import TagsCloud from "../components/TagsCloud";

export default function GamesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const { games, loading, error } = useSelector((state) => state.game);
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
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
          {!loading &&
            !error &&
            games.map((game) => <CompositionCard {...game} key={game._id} />)}
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
