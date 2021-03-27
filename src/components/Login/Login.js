import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { firebaseConfig } from "./firebase.config";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = {
          displayName: displayName,
          email: email,
        };
        setLoggedInUser(signedInUser);
        storeAuthToken();
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const storeAuthToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem("token", idToken);
        console.log(idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  };

  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignIn}>Google Sign IN</button>
    </div>
  );
};

export default Login;
