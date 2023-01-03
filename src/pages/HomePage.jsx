import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { getAllReviewsByTags } from "../slices/reviewSlice";
import TagsCloud from "../components/TagsCloud";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";
import ShortReviewCard from "../components/ShortReviewCard";
import Category from "../components/Category";
import { CATEGORY_NAME } from "../utils/const";

const TagsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
}));

export default function HomePage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { reviewsAll } = useSelector((state) => state.review);
  const { selectedTags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getAllReviewsByTags(selectedTags));
  }, [selectedTags]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid
          container
          spacing={2}
          sx={{ padding: 1.5 }}
          direction={matches ? "column" : "row"}
        >
          <Grid item xs>
            <TagsWrapper>
              <TagsCloud />
            </TagsWrapper>
          </Grid>
          <Grid item container xs={10} spacing={4} direction="row">
            <Grid item>
              <Typography
                variant="h6"
                color="secondary"
                sx={{ fontWeight: 300 }}
              >
                {t("category_lattest")}
              </Typography>
              <Category categoryName={CATEGORY_NAME.latest}>
                {reviewsAll &&
                  reviewsAll.latestReviews.map((review) => (
                    <ShortReviewCard {...review} key={review._id} />
                  ))}
              </Category>
            </Grid>
            {matches ? null : (
              <Grid item>
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ fontWeight: 300 }}
                >
                  {t("category_hottest")}
                </Typography>
                <Category categoryName={CATEGORY_NAME.hottest}>
                  {reviewsAll &&
                    reviewsAll.hottestReviews.map((review) => (
                      <ShortReviewCard {...review} key={review._id} />
                    ))}
                </Category>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
