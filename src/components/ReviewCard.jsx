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
import CommentsSection from "./CommentsSection";
import {
  getAllReviewsByTags,
  likeReview,
  unLikeReview,
} from "../slices/reviewSlice";
import { useEffect } from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTranslation } from "react-i18next";

import BasicModal from "./ui/Modal";
import EditReviewForm from "./EditReviewForm";
import Loader from "./ui/Loader";
import ReactMarkdown from "react-markdown";
import { generatePDF } from "../utils/generatePDF";
import { getTimeFromNow } from "../utils/getTimeFromNow";
import AlertComponent from "../components/ui/AlertComponent";

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
  [theme.breakpoints.down("md")]: {
    "&:hover": {
      height: 200,
    },
  },
}));

export default function ReviewCard({
  user,
  createdAt,
  img,
  tags,
  likes,
  _id,
  title,
  markdown,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const { locale } = useSelector((state) => state.locale);
  const { currentUser } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser && likes && setLiked(likes.includes(currentUser._id));
  }, [likes]);

  const handleLike = () => {
    if (liked && currentUser) {
      dispatch(unLikeReview(_id)).then(() => {
        dispatch(getAllReviewsByTags());
      });
      setLiked((prev) => !prev);
    } else {
      dispatch(likeReview(_id)).then(() => {
        dispatch(getAllReviewsByTags());
      });
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
      {currentUser && (user._id === currentUser._id || currentUser.isAdmin) ? (
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
        data-html2canvas-ignore
      />
      <Button
        variant="text"
        onClick={generatePDF}
        sx={{ position: "absolut" }}
        data-html2canvas-ignore
      >
        {t("review_page_fownload_pdf")}
      </Button>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {img.length
          ? img.map((item) =>
              item ? (
                <StyledCardMedia
                  component="img"
                  height="150"
                  sx={{ width: "auto", borderRadius: 5 }}
                  src={item}
                  alt="review"
                  key={item}
                />
              ) : null
            )
          : null}
      </Box>
      <Box
        sx={{ display: "flex", gap: 1, p: 2, flexWrap: "wrap" }}
        data-html2canvas-ignore
      >
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
        <Typography color="text.primary" component={"span"}>
          <ReactMarkdown>{title}</ReactMarkdown>
        </Typography>
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
          data-html2canvas-ignore
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
        <CommentsSection expanded={expanded} id={_id} />
      </Collapse>
      <BasicModal open={open} handleClose={handleClose}>
        <EditReviewForm
          currentReviewId={_id}
          handleClose={handleClose}
          setOpenAlert={setOpenAlert}
        />
      </BasicModal>
      <AlertComponent
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        text="Review changed!"
      />
    </StyledCard>
  );
}
