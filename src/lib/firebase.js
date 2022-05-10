import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, push} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDuKD6Dd7FIL7MiPz1iqRNfzvQNljFGvg0",
    authDomain: "test-541e5.firebaseapp.com",
    databaseURL: "https://test-541e5-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "test-541e5",
    storageBucket: "test-541e5.appspot.com",
    messagingSenderId: "509696045552",
    appId: "1:509696045552:web:820b8a7e2786221302ed35"
  };
  
  const app = initializeApp(firebaseConfig);

  export function writeUserData(answer) {
    const db = getDatabase();
    push(ref(db, 'answers/'), {
      answer: answer,
    }, {
      onlyOnce: true
    });
    
  }

  