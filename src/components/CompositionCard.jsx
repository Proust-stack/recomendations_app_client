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
import styled from "@mui/material/styles/styled";

import { getRating } from "../utils/getUsersRatingsMean";

const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const StyledImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90%",
    borderRadius: 10,
  },
}));

const CompositionCard = React.memo(function CompositionCard(props) {
  const { t } = useTranslation();
  const { img, title, _id, noLink } = props;
  const { currentComposition } = useSelector((state) => state.composition);
  const navigate = useNavigate();

  return (
    <StyledCard
      sx={{
        position: "relative",
        padding: 1,
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={img}
        alt="composition"
        sx={{ objectFit: "cover" }}
      />
      {/* <Box sx={{ height: 150 }}>
        <StyledImage
          height="100%"
          src={img[0]}
          fit="cover"
          duration={500}
          width="80%"
        /> */}
      {/* </Box> */}
      <CardContent>
        <Typography gutterBottom variant="h5">
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
    </StyledCard>
  );
});

export default CompositionCard;
