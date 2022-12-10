import axios from "axios";
import jwt_decode from "jwt-decode";

// export const signInGoogle = async (name, email, img) => {
//   const { data } = await axios({
//     withCredentials: true,
//     method: "post",
//     url: "http://localhost:5000/api/user/auth/google",
//     data: {
//       name,
//       email,
//       img,
//     },
//   });
//   localStorage.setItem("token", data.token);
//   return jwt_decode(data.token);
// };
