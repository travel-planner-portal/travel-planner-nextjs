import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2uGremPQ62gqy5Q1ljFZUWXbUQzGG874",
  authDomain: "travelgo-23f0a.firebaseapp.com",
  projectId: "travelgo-23f0a",
  storageBucket: "travelgo-23f0a.appspot.com",
  messagingSenderId: "745491598746",
  appId: "1:745491598746:web:94db9514e3fee65ded3e23",
  measurementId: "G-0WDE9DDPVD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
