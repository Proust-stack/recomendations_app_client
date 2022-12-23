import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import moment from "moment";
import { useEffect } from "react";
import Chip from "@mui/material/Chip";
import ReactMarkdown from "react-markdown";
import styled from "@mui/material/styles/styled";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: 15,
  cursor: "pointer",
  backgroundColor: "grey[100]",
}));

export default function ShortReviewCard({
  user,
  createdAt,
  img,
  tags,
  text,
  _id,
  handleClose,
  markdown,
}) {
  const [liked, setLiked] = React.useState(false);
  const { reviewsAll } = useSelector((state) => state.review);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const shortText = markdown.slice(0, 200) + "...";

  const handleClick = () => {
    navigate(`/review/${_id}`);
    handleClose && handleClose();
  };

  useEffect(() => {
    const reviewLikes = reviewsAll.find((item) => item._id === _id)?.likes;
    currentUser && setLiked(reviewLikes.includes(currentUser._id));
  }, []);

  return (
    <StyledCard onClick={handleClick}>
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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {img.length &&
          img.map((item) =>
            item ? (
              <CardMedia
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
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
          <ReactMarkdown>{shortText}</ReactMarkdown>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}
