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
import AddGroupForm from "./admin/AddGroupForm";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../slices/commentSlice";
import Box from "@mui/material/Box";

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

export default function ReviewCard({
  user,
  title,
  createdAt,
  img,
  tags,
  text,
  _id,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  const handleExpandClick = () => {
    if (!expanded) {
      dispatch(getAllComments(_id));
    }
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "90%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {user.img}
          </Avatar>
        }
        title={title}
        subheader={createdAt}
      />
      {img[0] && (
        <CardMedia component="img" height="194" image={img} alt="picture" />
      )}
      <Typography paragraph>{tags[0]}</Typography>
      <CardContent>{text}</CardContent>
      <CardContent>
        <Link to={`/review/${_id}`}>
          <Typography paragraph color="text.primary">
            read more
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          {comments.map((comment) => (
            <Typography paragraph key={comment._id}>
              {comment.text}
            </Typography>
          ))}
          <Comment reviewId={_id} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
