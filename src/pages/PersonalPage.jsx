import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

import NewReviewForm from "../components/NewReviewForm";
import BasicModal from "../components/ui/Modal";
import { useParams } from "react-router-dom";
import ReviewsTable from "../components/ReviewsTable";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import Loader from "../components/ui/Loader";
import { getAllReviewsByUser } from "../slices/reviewSlice";

export default function PersonalPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { reviews } = useSelector((state) => state.review);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { id } = useParams();
  useEffect(() => {
    id && dispatch(getAllReviewsByUser(id));
  }, []);

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
            <Tooltip title={t("mypage_new_review")}>
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
