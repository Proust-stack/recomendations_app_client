import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "80%",
  display: "flex",
  gap: 2,
  alignItems: "flex-start",
  flexWrap: "wrap",
  padding: 5,
};

export default function SearchModal({ open, handleClose }) {
  const { searchResults, loading } = useSelector((state) => state.review);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!loading &&
          (searchResults.length
            ? searchResults.map((review) => (
                <ReviewCard {...review} key={review._id} />
              ))
            : "no results")}
      </Box>
    </Modal>
  );
}
