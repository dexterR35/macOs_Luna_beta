  console.log("start app.js");

  // import functions from settings.js
  import {
    openNavLink,
    startTime,
    clickDivs,
    dragWindows,
   


  } from "./pages/settings.js";

  // call functions from settings.js
  openNavLink();
  startTime();
  clickDivs();
  dragWindows();
  GetAllDocuments();



 import { db, storage,app, GetAllDocuments } from "./pages/connect_firebase.js";


