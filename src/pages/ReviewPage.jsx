import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneReview } from "../slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";
import {
  getAllCompositions,
  getOneComposition,
} from "../slices/compositionSlice";
import CompositionCard from "../components/CompositionCard";
import UserRating from "../components/ui/UserRating";

export default function Reviewpage() {
  const dispatch = useDispatch();
  const [rated, setRated] = React.useState(false);
  let { id } = useParams();
  const { currentReview, loading, error } = useSelector(
    (state) => state.review
  );
  const { currentUser } = useSelector((state) => state.user);

  // const { currentComposition, loading: compositionLoading } = useSelector(
  //   (state) => state.composition
  // );

  useEffect(() => {
    dispatch(getOneReview(id));
  }, []);

  useEffect(() => {
    dispatch(getAllCompositions());
  }, []);

  // useEffect(() => {
  //   dispatch(getOneComposition(id));
  // }, []);

  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        minHeight: "100vh",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      <Box sx={{ alignSelf: "flex-start" }}>
        {currentReview._id && (
          <CompositionCard {...currentReview.composition} noLink={true} />
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {currentUser._id && !rated && currentReview._id ? (
          <UserRating
            compositionId={currentReview.composition._id}
            setRated={setRated}
          />
        ) : null}
        {currentReview._id && <ReviewCard {...currentReview} />}
      </Box>
    </Box>
  );
}
