import axios from "axios";

export const signInGoogle = async (name, email, img) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/user/auth/google",
    {
      name,
      email,
      img,
    }
  );
  return data;
};
