import { createStore, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import authReducer from './reducers/auth';

const firebaseConfig = {
  // firebase api config
  apiKey: 'AIzaSyB5fQ_274QvBR_d0P--QCCW_E2T1ERxjAU',
  authDomain: 'mypill-be1b6.firebaseapp.com',
  databaseURL: 'https://mypill-be1b6.firebaseio.com',
  projectId: 'mypill-be1b6',
  storageBucket: 'mypill-be1b6.appspot.com',
  messagingSenderId: '68136064138'
};

// initialize firebase & firestore + settings
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// react-redux-firebase with firestore config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// initial state & create store
const initialState = {
  auth: {
    uid: ''
  }
};

// add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer
});

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeWithDevTools(reactReduxFirebase(firebase))
);

export default store;
