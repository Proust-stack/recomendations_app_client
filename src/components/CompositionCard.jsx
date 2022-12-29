import React from "react";
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
import { useTranslation } from "react-i18next";
import Image from "mui-image";

import { getRating } from "../utils/getUsersRatingsMean";

const CompositionCard = React.memo(function CompositionCard(props) {
  const { t } = useTranslation();
  const { img, title, _id, noLink } = props;
  const { currentComposition } = useSelector((state) => state.composition);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        position: "relative",
        flexShrink: 1,
        padding: 1,
        flexGrow: 0,
        cursor: "pointer",
      }}
    >
      {/* <CardMedia
        component="img"
        height="194"
        image={img}
        alt="composition"
        sx={{ objectFit: "cover", width: "auto" }}
      /> */}
      <Image height="194" src={img[0]} fit="cover" duration={500} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {t("composition_component_reviews_rating")}:{" "}
            {currentComposition && getRating(currentComposition.reviewsRating)}
          </Typography>
          <StarsIcon />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 300 }}
          >
            {t("composition_component_user_rating")}:{" "}
            {currentComposition && getRating(currentComposition.usersRating)}
          </Typography>
          <StarIcon />
        </Box>
      </CardContent>
      <CardActions>
        {noLink ? null : (
          <Button size="small" onClick={() => navigate(`/composition/${_id}`)}>
            {t("composition_component_view_reviews")}
          </Button>
        )}
      </CardActions>
    </Card>
  );
});

export default CompositionCard;
