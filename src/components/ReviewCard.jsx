import React, { Suspense } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import moment from "moment";
import { Markup } from "interweave";
import CommentsSection from "./CommentsSection";
import { getOneReview, likeReview, unLikeReview } from "../slices/reviewSlice";
import { useEffect } from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BasicModal from "./ui/Modal";
import EditReviewForm from "./EditReviewForm";
import Loader from "./ui/Loader";
import { getOneComposition } from "../slices/compositionSlice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Styled = styled(FavoriteIcon)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    ml: 2,
  },
}));

export default function ReviewCard({
  user,
  createdAt,
  img,
  tags,
  text,
  _id,
  composition,
}) {
  const [expanded, setExpanded] = React.useState(true);
  const [liked, setLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { reviewsAll } = useSelector((state) => state.review);
  const { locale } = useSelector((state) => state.locale);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const reviewLikes =
      reviewsAll.find((item) => item._id === _id)?.likes || [];
    setLiked(reviewLikes.includes(currentUser._id));
  }, []);

  useEffect(() => {
    dispatch(getOneComposition(composition._id));
  }, []);

  const handleLike = () => {
    if (liked) {
      dispatch(unLikeReview(_id));
      setLiked((prev) => !prev);
    } else {
      dispatch(likeReview(_id));
      setLiked((prev) => !prev);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ padding: 1, flexGrow: 1, position: "relative" }}>
      {user === currentUser._id || currentUser.isAdmin ? (
        <Fab
          color="secondary"
          sx={{
            position: "absolute",
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={handleOpen}
        >
          <Tooltip title="Edit review">
            <ModeEditIcon />
          </Tooltip>
        </Fab>
      ) : null}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="avatar"
            src={user.img}
          />
        }
        title={user.name}
        subheader={moment(createdAt).fromNow()}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {img.length &&
          img.map((item) =>
            item ? (
              <CardMedia
                component="img"
                height="150"
                sx={{ width: 150 }}
                image={item}
                alt="picture"
                key={item}
              />
            ) : null
          )}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        {tags &&
          tags.map((tag) => (
            <Chip
              variant="outlined"
              key={tag}
              label={tag}
              color="primary"
              size="small"
            />
          ))}
      </Box>

      <CardContent>
        <Typography color="text.primary">
          <Markup content={text} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <Tooltip title={expanded ? "Hide comments" : "Show comments"}>
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Suspense fallback={<Loader />}>
          <CommentsSection expanded={expanded} id={_id} />
        </Suspense>
      </Collapse>
      <BasicModal open={open} handleClose={handleClose}>
        <EditReviewForm currentReviewId={_id} />
      </BasicModal>
    </Card>
  );
}
