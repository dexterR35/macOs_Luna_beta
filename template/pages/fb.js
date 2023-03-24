
  // Import the functions you need from the SDKs you need
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

  // Your web app's Firebase configuration

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
  // let selBtn = document.getElementById("selbtn");
  // let updBtn = document.getElementById("updBtn");
  // let delBtn = document.getElementById("delbtn");

  // let newDocRef;

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
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    const storageRef = ref(storage, 'avatars/' + newDocRef.id + '/' + file.name);
    await uploadBytes(storageRef, file);

    const avatarUrl = await getDownloadURL(storageRef);

    let ref_ = collection(db, "network");
    const newDocRef = doc(ref_);
    const data = {
      avatar: "avatar",
      firstName: firstNameBox.value,
      lastName: lastNameBox.value,
      phone: phoneBox.value,
      email,
      section: sectionBox.value,
      gender: genBox.value,
      portofolio: portofolioBox.value,
      idkeys: newDocRef.id,
      avatarUrl,
      timestamp: serverTimestamp(),
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
        (portofolioBox.value = ""), (emailBox.value = "");
        genBox.value = "";
        sectionBox.value = "";
      })
      .catch((error) => {
        alert("unsecc operation. error:" + error);
      });
    console.log("document id is" + newDocRef.id);
  }

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
        <div class="user_lastName"> ${doc.data().lastName}</div> 
            <div class="user_firstName">${doc.data().firstName}</div>
           
        </div>
    </div>

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
        }, 700);
      });
    });
  }

  GetAllDocuments();

  const emailMe = document.querySelector("._email_add");
  // const nameMe = document.querySelector("_name_add");
  // const lastNameMe = document.querySelector("_allias_add");
  const codepenMe = document.querySelector("._codepen_add");
  const linkedinMe = document.querySelector("._likedin_add");
  const cssBattleMe = document.querySelector("._cssbattle_add");
  const githubMe = document.querySelector("._github_add");
  const numberMe = document.querySelector("._number_add");
  const websiteMe = document.querySelector("._website_add");

  export async function getDataFromOwnerCollection() {
    try {
      const querySnapshot = await getDocs(collection(db, "onwer"));
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const data = doc.data();
          emailMe.innerHTML = data.email;
          numberMe.innerHTML = data.phone;
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

//   const docRef_onwer = getDocs(collection(db, "onwer"));

//   docRef_onwer
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         if (doc.exists) {
//           const data = doc.data();
//           emailMe.innerHTML = data.email;
//           numberMe.innerHTML = data.phone;
//           // nameMe.innerHTML = data.firstName;
//           // lastNameMe.innerHTML = data.lastName;
//           codepenMe.innerHTML = data.social.codepen;
//           linkedinMe.innerHTML = data.social.linkedin;
//           cssBattleMe.innerHTML = data.social.cssbattle;
//           githubMe.innerHTML = data.social.github;
//           websiteMe.innerHTML = data.website;


//         } else {
//           console.log("No such document!");
//         }
//       });
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });

  console.log("test");
  $(".test").click(function () {
    var parentDiv = $(this).parent();
    console.log("parentDiv", parentDiv);
    parentDiv.find(".hidden-section").slideToggle();
  });


//   export { checkEmailInNetworkCollection, GetAllDocuments, AddDocument_AutoID,GetAllDocuments };