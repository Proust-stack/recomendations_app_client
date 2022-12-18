import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../slices/gamesSlice";
import CompositionCard from "../components/CompositionCard";
import Grid from "@mui/material/Grid";
import TagsCloud from "../components/TagsCloud";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

export default function GamesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const { games } = useSelector((state) => state.game);
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
              {games &&
                games.map((game) => (
                  <CompositionCard {...game} key={game._id} />
                ))}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <TagsCloud groupId={games && games[0]?.group} />
            </Box>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
