import axios from "axios";

export const addGroup = async (title) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/group/create",
    title
  );
  return data;
};
export const addComposition = async (composition) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/composition/create",
    composition
  );
  return data;
};
