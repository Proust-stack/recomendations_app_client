import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import NewReviewForm from "../components/NewReviewForm";
import BasicModal from "../components/ui/Modal";
import { useParams } from "react-router-dom";
import ReviewsTable from "../components/ReviewsTable";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";

export default function PersonalPage() {
  const { reviews } = useSelector((state) => state.review);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { id } = useParams();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Box
          flex={4}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minHeight: "100vh",
            alignItems: "flex-start",
            padding: 6,
            position: "relative",
            gap: 2,
          }}
        >
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
          <BasicModal open={open} handleClose={handleClose}>
            <NewReviewForm />
          </BasicModal>
          {reviews && <ReviewsTable reviews={reviews} />}
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
}
