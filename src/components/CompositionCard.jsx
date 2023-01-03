import React from "react";
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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "@mui/material/styles/styled";

import { getRating } from "../utils/getUsersRatingsMean";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: 15,
  [theme.breakpoints.down("md")]: {
    width: "95%",
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
        image={img[0]}
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
        <Typography
          gutterBottom
          variant="h5"
          noWrap={false}
          color="text.primary"
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.primary" mr={1.5}>
            {t("composition_component_reviews_rating")}:{" "}
          </Typography>
          <Typography color="secondary">
            {currentComposition && getRating(currentComposition.reviewsRating)}
          </Typography>
          <StarsIcon color="secondary" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.primary" mr={1.5}>
            {t("composition_component_user_rating")}:{" "}
          </Typography>
          <Typography color="primary">
            {currentComposition && getRating(currentComposition.usersRating)}
          </Typography>
          <StarIcon color="primary" />
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
