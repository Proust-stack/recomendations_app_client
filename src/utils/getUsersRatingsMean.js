export const getUsersRating = (ratings) => {
  if (!ratings) return null;
  if (ratings.lengh === 0) return null;
  let estimations;
  if (ratings[0]?.userEstimation) {
    estimations = ratings.map((ratings) => ratings.userEstimation);
  } else {
    estimations = ratings.map((ratings) => ratings.reviewEstimation);
  }
  const sumOfEstimations = estimations.reduce((prev, curr) => prev + curr, 0);
  const mean = Math.round(sumOfEstimations / estimations.length);
  return isNaN(mean) ? null : mean;
};
