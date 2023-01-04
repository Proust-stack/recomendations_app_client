export const hasRated = (userRatings, userId) => {
  const usersWhoRated = userRatings.map((item) => item?.user);
  return usersWhoRated.includes(userId);
};
