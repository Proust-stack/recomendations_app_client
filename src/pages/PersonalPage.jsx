import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Skeleton } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import NewReviewForm from "../components/NewReviewForm";
import ReviewCard from "../components/ReviewCard";
import { getAllReviewsByUser } from "../slices/reviewSlice";
import BasicModal from "../components/ui/Modal";
import { useParams } from "react-router-dom";

export default function PersonalPage() {
  const { currentUser } = useSelector((state) => state.user);
  const { reviews } = useSelector((state) => state.review);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getAllReviewsByUser(id));
  }, []);

  return (
    <Box
      flex={4}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minHeight: "100vh",
        alignItems: "flex-start",
        padding: 6,
        position: "relative",
      }}
    >
      <BasicModal open={open} handleClose={handleClose} />
      <Fab
        color="secondary"
        sx={{
          position: "absolute",
          top: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        onClick={handleOpen}
      >
        <Tooltip title="New review">
          <AddIcon />
        </Tooltip>
      </Fab>
      {reviews &&
        reviews.map((review) => <ReviewCard {...review} key={review._id} />)}
    </Box>
  );
}
