import * as React from "react";
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
  fullText,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const { reviewsAll } = useSelector((state) => state.review);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const shortText = text.slice(0, 200) + "...";

  useEffect(() => {
    const reviewLikes = reviewsAll.find((item) => item._id === _id)?.likes;
    setLiked(reviewLikes.includes(currentUser._id));
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

  return (
    <Card sx={{ padding: 1, flexGrow: 1 }}>
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
        {tags.map((tag) => (
          <Typography paragraph key={tag}>
            {tag}
          </Typography>
        ))}
      </Box>

      <CardContent>
        <Markup content={fullText ? text : shortText} />
      </CardContent>
      {!fullText ? (
        <CardContent>
          <Link to={`/review/${_id}`}>
            <Typography paragraph color="text.primary">
              read more
            </Typography>
          </Link>
        </CardContent>
      ) : null}
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
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CommentsSection expanded={expanded} id={_id} />
      </Collapse>
    </Card>
  );
}
