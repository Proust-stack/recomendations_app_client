export const getReviewsRating = (ratings) => {
  if (!ratings) return null;
  if (ratings.lengh === 0) return null;
  const estimations = ratings.map((ratings) => ratings.userEstimation);
  const sumOfEstimations = estimations.reduce((prev, curr) => prev + curr, 0);
  const mean = Math.round(sumOfEstimations / estimations.length);
  return isNaN(mean) ? null : mean;
};
