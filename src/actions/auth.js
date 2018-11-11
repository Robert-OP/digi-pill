import * as firebase from 'firebase';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const firebaseLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const firebaseLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
