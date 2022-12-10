import axios from "axios";

export const addReview = async (review) => {
  const { data } = await axios.post("http://localhost:5000/api/review/create", {
    review,
  });
  return data;
};
