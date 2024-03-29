// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";

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

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBaPsn82u0CblmIXb9SktjOvfq2vRqeBPY",
  authDomain: "macos-luna.firebaseapp.com",
  databaseURL:
    "https://macos-luna-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "macos-luna",
  storageBucket: "macos-luna.appspot.com",
  messagingSenderId: "689056077392",
  appId: "1:689056077392:web:8275d5fe7f18ac35a5a355",
  measurementId: "G-5EMDZ1MDC2",
};

// Initialize Firebase
// async function AddDocument_CustomID() {
//   let ref = doc(db, "network", RollBox.value);
//   const docRef = await setDoc(ref, {
//     NameOfStd: NameBox.value,
//     RollNo: RollBox.value,
//     Section: SecBox.value,
//     Gender: GenBox.value,
//   })

//     .then(() => {
//       alert("data added succesfully");
//     })
//     .catch((error) => {
//       alert("unsecc operation. error:" + error);
//     });
//     console.log("document id is" + docRef);
// }

// Getting Document
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let firstNameBox = document.getElementById("firstNamebox");
let lastNameBox = document.getElementById("lastNamebox");

let phoneBox = document.getElementById("phonebox");
let emailBox = document.getElementById("emailbox");
let genBox = document.getElementById("genbox");
let sectionBox = document.getElementById("sectionbox");
let portofolioBox = document.getElementById("portofoliobox");

let insBtn = document.getElementById("insbtn");
let selBtn = document.getElementById("selbtn");
let updBtn = document.getElementById("updBtn");
let delBtn = document.getElementById("delbtn");

let newDocRef;

insBtn.addEventListener("click", AddDocument_AutoID);

async function checkEmailInNetworkCollection(email) {
  const q = query(collection(db, "network"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function AddDocument_AutoID() {
  const email = emailBox.value;
  // Check if the email exists in the "network" collection
  const emailExists = await checkEmailInNetworkCollection(email);
  if (emailExists) {
    alert("Email already exists in the network!");
    return;
  }

  let ref_ = collection(db, "network");
  const newDocRef = doc(ref_);

  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  const storageRef = ref(storage, 'avatars/' + newDocRef.id + '/' + file.name);
  await uploadBytes(storageRef, file);

  const avatarUrl = await getDownloadURL(storageRef);
 

  const data = {
    firstName: firstNameBox.value,
    lastName: lastNameBox.value,
    phone: phoneBox.value,
    email,
    section: sectionBox.value,
    gender: genBox.value,
    portofolio: portofolioBox.value,
    idkeys: newDocRef.id,
    timestamp: serverTimestamp(),
    avatarUrl,
  };
  // Validate the data before adding to Firestore
  if (
    !data.firstName ||
    !data.lastName ||
    !data.portofolio ||
    !data.section ||
    !data.phone ||
    !data.email ||
    !data.gender
  ) {
    console.error("Invalid data:", data);
    alert("add some data");
    return;
  }

  await setDoc(newDocRef, data)
  
    .then(() => {
      // console.log("data added succesfully");
      console.log("data added succesfully");
      // reset form inputs
      firstNameBox.value = "";
      lastNameBox.value = "";
      phoneBox.value = "";
      (portofolioBox.value = ""), 
      (emailBox.value = "");
      genBox.value = "";
      sectionBox.value = "";
    })
    .catch((error) => {
      alert("unsecc operation. error:" + error);
    });

  console.log("document id is" + newDocRef.id);
}
// console.log("Document written with ID: ", newDocRef.id);
// async function GetADocument() {
//   let ref = doc(db, "network");
//   const docSnap = await getDoc(ref);

//   if (docSnap.exists()) {
//     firstNameBox.value = docSnap.data().firstName;
//     lastNameBox.value = docSnap.data().lastName;
//     emailBox.value = docSnap.data().email;
//     genBox.value = docSnap.data().gender;
//     phoneBox.value = docSnap.data().phone;
//     sectionBox.value = docSnap.data().section;
//     portofolioBox.value = docSnap.data().portofolio;
//   } else {
//     alert("no suck a document");
//   }
// }

// Update document

// async function UpdateFieldsInADocument() {
//   let ref = doc(db, "network", RollBox.value);
//   await updateDoc(ref, {
//     NameOfStd: NameBox.value,
//     Section: SecBox.value,
//     Gender: GenBox.value,
//     RollNo: RollBox.value,
//   })
//     .then(() => {
//       alert("data updated succesfully");
//     })
//     .catch((error) => {
//       alert("unsecc operation. error:" + error);
//     });
// }

// delete document

// async function DeleteDocument() {
//   let ref = collection(db, "network", RollBox.value);
//   const docSnap = await getDoc(ref);

//   if (!docSnap.exists()) {
//     alert("document does not exist");
//     return;
//   }
//   await deleteDoc(ref)
//     .then(() => {
//       alert("data deleted succesfully");
//     })
//     .catch((error) => {
//       alert("unsecc operation. error:" + error);
//     });
// }

// insBtn.addEventListener("click", AddDocument_CustomID);

// selBtn.addEventListener("click", GetADocument);
// updBtn.addEventListener("click", UpdateFieldsInADocument);
// delBtn.addEventListener("click", DeleteDocument);

// get reference to container element in HTML
// const container = document.getElementById("container_get");

// retrieve all documents from collection "network"
// const loadingSpinner = document.getElementById("loading-spinner");
// loadingSpinner.style.display = "block";

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
    // snapsnot

    querySnapshot.forEach((doc) => {
      const userDiv = `
<div class="user-container">
  
    <div class="card_header">
    <div class = user_avatar>
      <img src="${doc.data().avatarUrl}" alt="User Avatar" class="user_avatar_img">
      </div>
      <div class= "user_fullName user_">
            <div class="user_firstName"> ${doc.data().firstName}</div> 
            <div class="user_lastName">${doc.data().lastName}</div>
        </div>
    </div>
    <button class="show-hidden-section-btn test">Show Hidden Section</button>
  <div class="user_email user_ user_font">${doc.data().email}</div>
  <div class="user_section user_ user_font">${doc.data().section}</div>



  <div class="card-body">
      <div class="user_section_hide hidden-section ">
          <div class="user_portofolio user_ user_font">${
            doc.data().portofolio
          }</div>
          <div class="user_phone user_ user_font">${doc.data().phone}</div>
          <div class="user_gender user_ user_font">${doc.data().gender}</div>
          <div class="user_idkeys user_ user_font" style="display:none">${
            doc.data().idkeys
          }</div>
      </div>
  </div>
</div>
`;
      setTimeout(() => {
        container.insertAdjacentHTML("afterbegin", userDiv);
        // loadingSpinner.style.display = "none";
      }, 1000);
    });
  });
}

// async function displayAvatarUrlsFromStorage() {
//   const storageRef = ref(storage, "avatars");
//   const listResult = await listAll(storageRef);

//   listResult.items.forEach(async (itemRef) => {
//     const avatarUrl = await getDownloadURL(itemRef);
//     const imageDiv = document.createElement('div');
//     const image = document.createElement('img');
//     image.src = avatarUrl;
//     imageDiv.appendChild(image);
//     document.body.appendChild(imageDiv);
//   });
// }

// displayAvatarUrlsFromStorage();

GetAllDocuments();
// const storage = getStorage(app);
// const analytics = getAnalytics(app);

// const emailElem = document.getElementById("email");
// const nameElem = document.getElementById("name");
// const usernameElem = document.getElementById("username");
// const messageElem = document.getElementById("message");
// const codepenElem = document.getElementById("codepen");
// const imgAppend = document.querySelector(".append_img");
// const testAppend = document.querySelector(".testAppend");

// const docRef_onwer = getDocs(collection(db, "onwer"));
// const imagesRef = ref(storage, "gs://macos-luna.appspot.com/Images");

// docRef_onwer
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       if (doc.exists) {
//         const data = doc.data();
//         emailElem.innerHTML = data.email;
//         nameElem.innerHTML = data.firstName;
//         usernameElem.innerHTML = data.lastName;
//         testAppend.innerHTML = data.imagess;

//         // codepenElem.innerHTML = data.social.codepen;

//         // const imageRefss = data.imagess;
//         // console.log(imageRefs,"imageRefs")
//         // console.log(imageRefs, "imageRefs");
//       } else {
//         console.log("No such document!");
//       }
//     });
//   })
//   .catch((error) => {
//     console.log("Error getting documents: ", error);
//   });

// listAll(imagesRef)
//   .then((res) => {
//     res.items.forEach((itemRef) => {
//       getDownloadURL(itemRef)
//         .then((url) => {
//           const img_c = document.createElement("img");
//           img_c.src = url;
//           imgAppend.appendChild(img_c);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// const imageRef = ref(
//   storage,
//   "gs://macos-luna.appspot.com/Images/macos2.webp"
// );
// getDownloadURL(imageRef)
//   .then((url) => {
//     console.log(url);
//     console.log(imageRef);
//     const img = document.getElementById("myImage");
//     console.log(img, "img");
//     img.src = url;
//   })
//   .catch((error) => {
//     console.log(error);
//   });

console.log("test");
$(".test").click(function () {
  var parentDiv = $(this).parent();
  console.log("parentDiv", parentDiv);
  parentDiv.find(".hidden-section").slideToggle();
});
