import firebase from "../config/firebase-config";

export const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const credential = res.credential;
      const token = credential.idToken;
      const user = res.user;

      return { success: true, credential, token, user };
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used.
      const email = error.email;

      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
      return { success: false, errorMessage, email };
    });
};

export const socialMediaLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("SUCCESSFULLY SIGNED OUT");
    })
    .catch((error) => {
      // An error happened.
      console.log("FAILED TO SIGN OUT");
    });
};
