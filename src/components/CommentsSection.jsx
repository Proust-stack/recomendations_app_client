import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import { getAllComments } from "../slices/commentSlice";
import ErrorFallback from "../utils/errorCallback";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./ui/Loader";

export default function CommentsSection({ expanded, id }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    const timer = setInterval(() => {
      if (expanded) {
        dispatch(getAllComments(id));
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          {comments &&
            comments.map((comment) => (
              <Box key={comment._id}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="caption">{comment.user.name}</Typography>
                  <Typography variant="caption">
                    {moment(comment.createdAt).fromNow()}
                  </Typography>
                </Stack>
                <Typography paragraph>{comment.text}</Typography>
              </Box>
            ))}
          <Comment reviewId={id} />
        </CardContent>
      </Suspense>
    </ErrorBoundary>
  );
}
