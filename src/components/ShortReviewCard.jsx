import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ReactMarkdown from "react-markdown";
import styled from "@mui/material/styles/styled";

import { useTranslation } from "react-i18next";
import { getTimeFromNow } from "../utils/getTimeFromNow";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: 2,
  cursor: "pointer",
  backgroundColor: "grey[100]",
  maxWidth: 500,
  [theme.breakpoints.up("lg")]: {
    minWidth: 500,
  },
  [theme.breakpoints.down("lg")]: {
    minWidth: "100%",
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { locale } = useSelector((state) => state.locale);

  const shortText = markdown.slice(0, 200) + "...";

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
    </StyledCard>
  );
}
