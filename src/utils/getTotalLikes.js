export const getTotalLikes = (reviews) => {
  const likes = reviews.map((rewiew) => rewiew.likes.length);
  const likesTotalQuantity =
    likes.reduce((prev, curr) => prev + curr, 0) + "❤️";
  return likesTotalQuantity;
};
