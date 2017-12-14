import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const loginErrObj = (err) => ({
  type: "LOGIN_ERROR",
  error: err.message,
  email: err.email
});

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = (loginType) => {
  return (dispatch) => {

    if (loginType === "google") { 
      return firebase.auth().signInWithPopup(googleAuthProvider)
        .catch((err) =>  {
          dispatch(loginErrObj(err));
          return err;
        });
     } else if (loginType === "facebook") {
        return firebase.auth().signInWithPopup(facebookAuthProvider)
          .catch((err) =>  {
            dispatch(loginErrObj(err))
            return err;
          });

     } else { return; }
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
