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
import { useEffect } from "react";
import Chip from "@mui/material/Chip";
import ReactMarkdown from "react-markdown";
import styled from "@mui/material/styles/styled";

import { useTranslation } from "react-i18next";
import { getTimeFromNow } from "../utils/getTimeFromNow";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: 15,
  cursor: "pointer",
  backgroundColor: "grey[100]",
  maxWidth: 500,
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

export default function ShortReviewCard({
  user,
  createdAt,
  img,
  tags,
  likes,
  title,
  _id,
  handleClose,
  markdown,
  composition,
  noFoto,
}) {
  const [liked, setLiked] = React.useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { locale } = useSelector((state) => state.locale);

  const shortText = markdown.slice(0, 200) + "...";

  useEffect(() => {
    if (currentUser) {
      setLiked(likes.includes(currentUser._id));
    }
  }, [currentUser]);

  const handleClick = () => {
    navigate(`/review/${_id}`);
    handleClose && handleClose();
  };

  return (
    <StyledCard onClick={handleClick} elevation={12}>
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
      {!noFoto && (
        <Box sx={{ display: "flex", gap: 2, mb: 2, ml: 2, flexWrap: "wrap" }}>
          {img.length
            ? img.map((item) =>
                item ? (
                  <CardMedia
                    component="img"
                    height="150"
                    sx={{ width: 120, borderRadius: 5 }}
                    src={item}
                    alt="review"
                    key={item}
                  />
                ) : null
              )
            : null}
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 1, ml: 2, flexWrap: "wrap" }}>
        {tags &&
          tags.map((tag) => (
            <Chip
              variant="outlined"
              key={tag}
              label={tag}
              color="secondary"
              size="small"
            />
          ))}
      </Box>
      <CardContent>
        <Typography color="secondary" component={"span"}>
          {composition.title}
        </Typography>
        <Typography color="text.primary" component={"span"}>
          <ReactMarkdown>{title}</ReactMarkdown>
        </Typography>
        <Typography
          color="text.primary"
          component={"span"}
          sx={{ fontSize: "0.8rem" }}
        >
          <ReactMarkdown>{shortText}</ReactMarkdown>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {currentUser ? (
          <IconButton aria-label="add to favorites">
            {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
          </IconButton>
        ) : null}
      </CardActions>
    </StyledCard>
  );
}
