import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAjQRsJJNeh0wWiAbaPLi9dVTtwpsvcRbw',
  authDomain: 'fpm-mymoney.firebaseapp.com',
  projectId: 'fpm-mymoney',
  storageBucket: 'fpm-mymoney.appspot.com',
  messagingSenderId: '875347678981',
  appId: '1:875347678981:web:973243b80af1269db6896c',
};

// init fireabase
firebase.initiialzieApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
