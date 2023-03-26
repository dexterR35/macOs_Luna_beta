import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  uploadBytes

} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
// https://firebase.google.com/docs/web/setup#available-libraries

//  import { db, storage,firebaseConfig } from "./pages/test.js";
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

/* initiate firebase */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


/* Documnets from admin inputs */

let firstNameBox = document.getElementById("firstNamebox");
let lastNameBox = document.getElementById("lastNamebox");
let emailBox = document.getElementById("emailbox");
let genBox = document.getElementById("genbox");
let sectionBox = document.getElementById("sectionbox");
let portofolioBox = document.getElementById("portofoliobox");

/* Documnets from Gender Selection and display img Data */
const maleAvatarsRef = ref(storage, "avatar_profile/men");
const femaleAvatarsRef = ref(storage, "avatar_profile/female");
const genderSelect = document.querySelector(".gender");
const avatarGrid = document.querySelector(".avatar_selected");
const avatarUrlInput = document.querySelector("#avatarUrlInput");

/* Documnets from Owner Data */

const emailMe = document.querySelector("._email_add");
// const nameMe = document.querySelector("_name_add");
// const lastNameMe = document.querySelector("_allias_add");
const codepenMe = document.querySelector("._codepen_add");
const linkedinMe = document.querySelector("._likedin_add");
const cssBattleMe = document.querySelector("._cssbattle_add");
const githubMe = document.querySelector("._github_add");
const numberMe = document.querySelector("._number_add");
const websiteMe = document.querySelector("._website_add");


const insBtn = document.querySelector(".insbtn");

// const addButton = document.getElementById('add-data-btn');
const modal = document.getElementById('modal');
const message = document.getElementById('modal-message');
const loadingBar = document.getElementById('loading-bar-progress');
/* query mail */
async function checkEmailInNetworkCollection(email) {
  const q = query(collection(db, "network"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
/* add user */

async function AddDocument_AutoID() {

  const email = emailBox.value;
  const emailExists = await checkEmailInNetworkCollection(email);
  if (emailExists) {
    showLoadingModal(emailBox.value + " " + "already exists in the network!");
    // alert("Email already exists in the network!");
    return;
  }



  const selectedAvatar = avatarGrid.querySelector(".selected");
  const selectedAvatarRef = selectedAvatar ? selectedAvatar.getAttribute("src") : null;
  console.log(selectedAvatarRef, "select avatar");
  if (!selectedAvatar) {
    showLoadingModal(selectedAvatar + " " + "Please select an avatar!");
    // alert("Please select an avatar!");
    return;
  }



  let ref_ = collection(db, "network");

  const newDocRef = doc(ref_);

  const data = {
    firstName: firstNameBox.value,
    lastName: lastNameBox.value,
    email,
    section: sectionBox.value,
    gender: genBox.value,
    portofolio: portofolioBox.value,
    idkeys: newDocRef.id,
    selectedAvatarRef,
    timestamp: serverTimestamp(),
    info: {
      likes: 10,
      starCount: 5,
      message: "mesage"
    },
  };

  /* Validate Data before adding to firestore */

  if (
    !data.firstName ||
    !data.lastName ||
    !data.portofolio ||
    !data.section ||
    !data.selectedAvatarRef ||
    !data.email ||
    !data.gender
  ) {
    console.error("Invalid data:", data);
    showLoadingModal(data + "Fill All the inputs");
    // alert("Fill All the inputs");
    return;
  }
  console.log("1");
  await showLoadingModal("Well Done, Data added successfully!")
    .then(() => {
      console.log("2");
      setDoc(newDocRef, data);
    })

    /* Reset Form */
    .then(() => {
      console.log("3");
      console.log("data added succesfully");
      // reset form inputs
      firstNameBox.value = ""
      lastNameBox.value = ""
      portofolioBox.value = ""
      emailBox.value = ""
      genBox.value = ""
      sectionBox.value = ""
      // show success message modal

    })
    .catch((error) => {
      console.log("4");
      showLoadingModal("unsecc operation. error:" + error);
      alert("unsecc operation. error:" + error);
    });
  console.log("document id is" + newDocRef.id);

}

async function showLoadingModal(_message) {
  // Show the popup modal
  modal.style.display = 'flex';
  // Set the message
  // message.innerText = 'Adding to database. please wait...';
  message.innerText = _message;
  // Set the initial width of the loading bar
  loadingBar.style.width = '0%';
  // Animate the loading bar
  setTimeout(function () {
    loadingBar.style.width = '100%';
    // Wait for 1 second
    setTimeout(function () {
      // Set the success message
      message.innerText = _message;
      // Hide the popup modal after 1 second
      setTimeout(function () {
        modal.style.display = 'none';
      }, 1200);
    }, 1000);
  }, 400);
}


insBtn.addEventListener("click", AddDocument_AutoID);
/* Get Documents Real time */
async function GetAllDocuments() {

  const collectionRef = collection(db, "network");
  const container = document.querySelector("#container_get");



  onSnapshot(collectionRef, (querySnapshot) => {
    // Clear the previous user containers from the container element
    container.innerHTML = "";

    // Find the last added document in the query snapshot
    let lastAddedDoc = null;
    querySnapshot.docChanges().forEach((change) => {
      if (
        change.type === "added" &&
        (!lastAddedDoc ||
          change.doc.data().timestamp > lastAddedDoc.data().timestamp)
      ) {
        lastAddedDoc = change.doc;
      }
    });




    /* Create Card for user */



    querySnapshot.forEach((doc) => {

      const userDiv = `
  <div class="user-container">
      <div class="card_header">
          <div class=user_avatar>
              <img src="${doc.data().selectedAvatarRef}" alt="User Avatar" class="user_avatar_img">
          </div>
          <div class="user_fullName user_">
              <div class="user_lastName">${doc.data().lastName}</div>
              <div class="user_firstName">${doc.data().firstName}</div>
              <div class="user_section">"${doc.data().section}"</div>
          </div> 
      </div>
      <div class="user_email user_ user_font"><span class="user_span">Email:</span> ${doc.data().email}</div>
      <div class="card-body">
          <div class="user_section_hide hidden-section">
              <div class="user_portofolio user_ user_font"><span class="user_span">Website:</span> ${doc.data().portofolio}</div>
              <div class="user_gender user_ user_font"><span class="user_span">Gender:</span> ${doc.data().gender}</div>
              <div class="user_idkeys user_ user_font" style="display:none"><span class="user_span">Tokken:</span> ${doc.data().idkeys}</div>
              <div class="user_footer">
                  <div class="user_likes">
                      <p>likes</p>
                  </div>
                  <a href="https://www.${doc.data().portofolio}" id="myLinkS" target="_blank"><button>i m
                      here</button></a>
              </div>
          </div>
      </div>
  </div>
`;
      setTimeout(() => {
        container.insertAdjacentHTML("afterbegin", userDiv);
      }, 700);
    });

  });

}

/* Get Data For Owner */

async function getDataFromOwnerCollection() {
  try {
    const querySnapshot = await getDocs(collection(db, "onwer"));
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        emailMe.innerHTML = data.email;
        codepenMe.innerHTML = data.social.codepen;
        linkedinMe.innerHTML = data.social.linkedin;
        cssBattleMe.innerHTML = data.social.cssbattle;
        githubMe.innerHTML = data.social.github;
        websiteMe.innerHTML = data.website;
      } else {
        console.log("No such document!");
      }
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
}
/* Load Avatars and append in a div */

async function loadAvatars(gender) {
  /* Clear the avatar grid */
  avatarGrid.innerHTML = "";
  let avatarsRef;
  /* display img for male or female */
  if (gender === "male") {
    $(".modal_avatars").css("display", "block")
    avatarsRef = maleAvatarsRef;
  } else if (gender === "female") {
    $(".modal_avatars").css("display", "block")
    avatarsRef = femaleAvatarsRef;
  }
  let selectedImg;
  /* display all img with attr */
  if (avatarsRef) {

    try {
      const avatarsSnapshot = await listAll(avatarsRef);
      avatarsSnapshot.items.forEach(async (avatarRef) => {

        const avatarUrl = await getDownloadURL(avatarRef);

        const img_ = document.createElement("img");
        img_.src = avatarUrl;
        img_.setAttribute("type", "image/svg+xml");
        /* Click one avatar and add a class and update the ui*/
        img_.addEventListener("click", () => {
          /*chose avatar with class*/
          if (img_.classList.contains("selected")) {
            img_.classList.remove("selected");
            avatarUrlInput.value = "";
            selectedImg = null;
          } else {
            avatarGrid.querySelectorAll("img").forEach((img) => {
              img.classList.remove("selected");
            });
            img_.classList.add("selected");
            avatarUrlInput.value = avatarUrl;
            selectedImg = img_;
            console.log(selectedImg, "select img")
          }
        });

        if (selectedImg && avatarUrl === selectedImg.src) {
          img_.classList.add("selected");
          avatarUrlInput.value = avatarUrl;
          selectedImg = img_;
        }

        avatarGrid.appendChild(img_);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

/* When the gender select changes, load the corresponding avatars*/

genderSelect.addEventListener("change", () => {
  const gender = genderSelect.value;
  console.log(gender, "gender select")
  if (gender) {
    loadAvatars(gender);
  } else {
    avatarGrid.innerHTML = "";
  }
});

GetAllDocuments();
getDataFromOwnerCollection()

export {
  app,
  db,
  storage,
  firebaseConfig
};