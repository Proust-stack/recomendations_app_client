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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import moment from "moment";
import { Markup } from "interweave";
import { likeReview, unLikeReview } from "../slices/reviewSlice";
import { useEffect } from "react";
import Chip from "@mui/material/Chip";

const Styled = styled(FavoriteIcon)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    ml: 2,
  },
}));

export default function ShortReviewCard({
  user,
  createdAt,
  img,
  tags,
  text,
  _id,
  handleClose,
}) {
  const [liked, setLiked] = React.useState(false);
  const { reviewsAll } = useSelector((state) => state.review);
  const { locale } = useSelector((state) => state.locale);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shortText = text.slice(0, 200) + "...";

  const handleClick = () => {
    navigate(`/review/${_id}`);
    handleClose && handleClose();
  };

  useEffect(() => {
    const reviewLikes = reviewsAll.find((item) => item._id === _id)?.likes;
    setLiked(reviewLikes.includes(currentUser._id));
  }, []);

  return (
    <Card
      sx={{ padding: 1, flexGrow: 1, cursor: "pointer" }}
      onClick={handleClick}
    >
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
          <Markup content={shortText} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
