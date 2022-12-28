import React, { Suspense } from "react";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
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
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import moment from "moment";
import CommentsSection from "./CommentsSection";
import { likeReview, unLikeReview } from "../slices/reviewSlice";
import { useEffect } from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Image from "mui-image";
import { useTranslation } from "react-i18next";

import BasicModal from "./ui/Modal";
import EditReviewForm from "./EditReviewForm";
import Loader from "./ui/Loader";
import ReactMarkdown from "react-markdown";
import { generatePDF } from "../utils/generatePDF";
import { getTimeFromNow } from "../utils/getTimeFromNow";
import {
  LasyCommentSection,
  LasyCommentSectionComponent,
} from "../hocs/LazyComponent";

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

const StyledCard = styled(Card)(({ theme }) => ({
  padding: 2,
  position: "relative",
}));
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  transition: "0.1s .3s ease-out",
  "&:hover": {
    height: 300,
  },
}));

export default function ReviewCard({
  user,
  createdAt,
  img,
  tags,
  text,
  _id,
  markdown,
}) {
  const [expanded, setExpanded] = React.useState(true);
  const [liked, setLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { reviewsAll } = useSelector((state) => state.review);
  const { locale } = useSelector((state) => state.locale);
  const { currentUser } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const reviewLikes = reviewsAll
      ? reviewsAll.find((item) => item._id === _id)?.likes
      : [];
    currentUser && setLiked(reviewLikes.includes(currentUser._id));
  }, []);

  const handleLike = () => {
    if (liked && currentUser) {
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
    <StyledCard id="review">
      {currentUser && (user === currentUser._id || currentUser.isAdmin) ? (
        <Fab
          color="secondary"
          sx={{
            position: "absolute",
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={handleOpen}
        >
          <Tooltip title={t("review_component_edit_review")}>
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
        subheader={getTimeFromNow(createdAt, locale)}
      />
      <Button variant="text" onClick={generatePDF} sx={{ position: "absolut" }}>
        {t("review_page_fownload_pdf")}
      </Button>
      <Box sx={{ display: "flex", gap: 2, m: 2, height: 150 }}>
        {img.length &&
          img.map((item) =>
            item ? (
              <StyledCardMedia
                component="img"
                height="150"
                sx={{ width: "auto", borderRadius: 5 }}
                image={item}
                alt="picture"
                key={item}
              />
            ) : null
          )}
      </Box>
      <Box sx={{ display: "flex", gap: 1, p: 2, flexWrap: "wrap" }}>
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
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {currentUser ? (
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
          </IconButton>
        ) : null}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <Tooltip
            title={
              expanded
                ? t("review_component_hide_comments")
                : t("review_component_show_comments")
            }
          >
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <LasyCommentSectionComponent expanded={expanded} id={_id} />
      </Collapse>
      <BasicModal open={open} handleClose={handleClose}>
        <EditReviewForm currentReviewId={_id} handleClose={handleClose} />
      </BasicModal>
    </StyledCard>
  );
}
