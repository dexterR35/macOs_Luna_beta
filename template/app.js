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
  import {
    getFirestore,
    collection,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";


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

  const emailMe = document.querySelector("._email_add");
  // const nameMe = document.querySelector("_name_add");
  // const lastNameMe = document.querySelector("_allias_add");
  const codepenMe = document.querySelector("._codepen_add");
  const linkedinMe = document.querySelector("._likedin_add");
  const cssBattleMe = document.querySelector("._cssbattle_add");
  const githubMe = document.querySelector("._github_add");
  const numberMe = document.querySelector("._number_add");
  const websiteMe = document.querySelector("._website_add");
  
  const docRef_onwer = getDocs(collection(db, "onwer"));



  docRef_onwer
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const data = doc.data();
          emailMe.innerHTML = data.email;
          numberMe.innerHTML = data.phone;
          // nameMe.innerHTML = data.firstName;
          // lastNameMe.innerHTML = data.lastName;
          codepenMe.innerHTML = data.social.codepen;
          linkedinMe.innerHTML = data.social.linkedin;
          cssBattleMe.innerHTML = data.social.cssbattle;
          githubMe.innerHTML = data.social.github;
          websiteMe.innerHTML = data.website;
      

        } else {
          console.log("No such document!");
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


