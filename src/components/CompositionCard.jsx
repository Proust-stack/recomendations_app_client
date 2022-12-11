import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserRating from "./ui/UserRating";
import { useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import BasicModal from "./ui/Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CompositionCard(props) {
  const { img, title, tags, reviewsRating, usersRating, _id } = props;
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      {currentUser._id ? <UserRating /> : null}
      <CardMedia
        component="img"
        height="140"
        image={img[0]}
        alt="composition"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tags}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {reviewsRating}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {usersRating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/composition/${_id}`)}>
          View reviews
        </Button>
      </CardActions>
      <Fab
        color="secondary"
        size="small"
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        onClick={handleOpen}
      >
        <Tooltip title="New review">
          <AddIcon />
        </Tooltip>
      </Fab>
      <BasicModal open={open} handleClose={handleClose} id={_id} />
    </Card>
  );
}
