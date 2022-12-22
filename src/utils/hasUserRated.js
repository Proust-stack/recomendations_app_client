export const hasRated = (composition, userId) => {
  const usersWhoRated = composition.map((item) => item?.user);
  return usersWhoRated.includes(userId);
};
