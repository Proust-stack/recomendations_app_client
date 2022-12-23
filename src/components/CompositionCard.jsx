import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarsIcon from "@mui/icons-material/Stars";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import { getOneComposition } from "../slices/compositionSlice";
import { getUsersRating } from "../utils/getUsersRatingsMean";
import { DEFAULT_IMG } from "../utils/const";

export default function CompositionCard(props) {
  const { img, title, tags, reviewsRating, _id, noLink } = props;
  const { currentComposition } = useSelector((state) => state.composition);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneComposition(_id));
  }, []);

  return (
    <Card
      sx={{
        position: "relative",
        flexShrink: 1,
        padding: 1,
        flexGrow: 1,
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={DEFAULT_IMG}
        alt="composition"
        sx={{ objectFit: "cover", width: "auto" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Reviews rating:{" "}
            {currentComposition &&
              getUsersRating(currentComposition.reviewsRating)}
          </Typography>
          <StarsIcon />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 300 }}
          >
            User rating:{" "}
            {currentComposition &&
              getUsersRating(currentComposition.usersRating)}
          </Typography>
          <StarIcon />
        </Box>
      </CardContent>
      <CardActions>
        {noLink ? null : (
          <Button size="small" onClick={() => navigate(`/composition/${_id}`)}>
            View reviews
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
