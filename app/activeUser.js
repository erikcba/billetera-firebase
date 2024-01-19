import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from './firebase.js'

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    
  } else {
    console.log('user is no active')
  }
});