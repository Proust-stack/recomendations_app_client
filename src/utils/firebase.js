import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsghJtD-EGvw_sJ5-kf-8_TdtRUptvf9s",
  //authDomain: "whatever-aba07.firebaseapp.com",
  authDomain: "guileless-paletas-797aa8.netlify.app",
  projectId: "whatever-aba07",
  storageBucket: "whatever-aba07.appspot.com",
  messagingSenderId: "209022601699",
  appId: "1:209022601699:web:f8ddba023ee2cbf0ccb8d6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
