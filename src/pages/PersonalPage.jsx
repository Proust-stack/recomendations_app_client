import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NewReviewForm from "../components/NewReviewForm";
import { addReview, getReviews } from "../http/reviewAPI";

export default function PersonalPage() {
  const { currentUser } = useSelector((state) => state.user);
  const getAllReview = async () => {
    const reviews = await getReviews(currentUser._id);
    console.log(reviews);
  };
  useEffect(() => {
    getAllReview();
  }, []);

  return <NewReviewForm />;
}
