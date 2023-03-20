  console.log("start app.js");

  // import functions from settings.js
  import {
    openNavLink,
    startTime,
    clickDivs,
    dragWindows


  } from "./pages/settings.js";

  // call functions from settings.js
  openNavLink();
  startTime();
  clickDivs();
  dragWindows();

  // Import the functions you need from the SDKs you need
  import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
  //  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
  import {
    getFirestore,
    collection,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBaPsn82u0CblmIXb9SktjOvfq2vRqeBPY",
    authDomain: "macos-luna.firebaseapp.com",
    databaseURL: "https://macos-luna-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "macos-luna",
    storageBucket: "macos-luna.appspot.com",
    messagingSenderId: "689056077392",
    appId: "1:689056077392:web:8275d5fe7f18ac35a5a355",
    measurementId: "G-5EMDZ1MDC2",
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // const analytics = getAnalytics(app);

  const emailElem = document.getElementById("email");
  const nameElem = document.getElementById("name");
  const usernameElem = document.getElementById("username");
  const codepenElem = document.getElementById("codepen");
  const docRef_onwer = getDocs(collection(db, "onwer"));


  docRef_onwer
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const data = doc.data();
          emailElem.innerHTML = data.email;
          nameElem.innerHTML = data.firstName;
          usernameElem.innerHTML = data.lastName;
          codepenElem.innerHTML = data.social.codepen;
        } else {
          console.log("No such document!");
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


