console.log("start index");
// one http request for all css files

const cssUrls = [
  // 'appStyle.css',
  './pages/header/header.css',
  './pages/icons/icons.css',
  './pages/chrome/chrome.css',
  './pages/customize/customize.css',
  './pages/linkdin/linkdin.css',
  './pages/github/github.css',
  './pages/finder/finder.css',
  './pages/terminal/terminal.css',
  './pages/s_adobe/s_adobe.css',
  './pages/p_adobe/p_premiere.css',
  // './pages/p_adobe/p_photoshop.css',
  // './pages/p_adobe/p_afterEffects.css'
];

Promise.all(cssUrls.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(res => res.text())))
  .then(texts => new Blob(texts, {
    type: 'text/css'
  }))
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  });

// end http request for all css files


// fetch all html file 
function fetchHTMLContent(url, selector) {
  fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((htmlContent) => {
      document.querySelector(selector).innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error(`Failed to fetch HTML content from ${url}:`, error);
    });
}

// add fetch in divs

fetchHTMLContent("./pages/header/header.html", "#header-container");
fetchHTMLContent("./pages/icons/icons.html", "#footer-container");
fetchHTMLContent("./pages/linkdin/linkdin.html", ".linkedin_push");
fetchHTMLContent("./pages/github/github.html", ".github_push");

// end fetch all html file with export function

// load all html file same as fetch but one dif , this have script inside html

$("#chrome_push").load("./pages/chrome/chrome.html");
$("#customize_push").load("./pages/customize/customize.html");
$("#finder_push").load("./pages/finder/finder.html");
$("#terminal_push").load("./pages/terminal/terminal.html");
$("#adobe_push").load("./pages/s_adobe/s_adobe.html");
$("#premiere_push").load("./pages/p_adobe/p_premiere.html");
$("#xD_push").load("./pages/p_adobe/p_xd.html");
$("#photoshop_push").load("./pages/p_adobe/p_photoshop.html");
$("#afterEffects_push").load("./pages/p_adobe/p_afterEffects.html");
console.log("end index");



function openPage(pageName, elmnt, color) {
  let i, tabcontent, tablinks;
  tabcontent = document.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(".all_links");
  console.log(tablinks, "tabs")
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  let pageNameDisplay = document.getElementById(pageName);
  console.log(pageNameDisplay, "pagename")
  pageNameDisplay.style.display = "block";
  // elmnt.style.backgroundColor = color;

}


// document.querySelector(".all_links").click();
// document.getElementById("defaultOpen").click();




// let _folders = document.querySelector(".js_folders");
// let _foldersTxt = ["projects", "landing-page", "videos", "music", "text"];

// function generateFolders() {
//   for (let j = 1; j <= 15; j++) {
//     _folders.innerHTML +=
//       "<div class ='folder_nr" +
//       j +
//       " -folders'>" +
//       "<div class='folder-inside'>" +
//       "</div>" +
//       "<div class='folder-insideTxt'>" +
//       _foldersTxt[0] +
//       "</div>" +
//       "</div>";
//   }
// }

// generateFolders();

// $(".change_display").click(function () {
//   $(".change_folders").toggleClass("active");
//   $(".folder-inside").toggleClass("active_large");
// });

// call typewriter function

// $("._modal_adobe").hide();
// $(".adobe-icons").click(function () {
//   let splash_adobe = document.querySelector(".splash_adobe");
//   console.log(splash_adobe, "spal");
//   let imagePath = "";
//   let image_bPath = "./png/cloudLogo.png";
//   let classPath = "";
//   let textPath = "";
//   let textInside = "";
//   if ($(this).hasClass("_click_premiere")) {
//     imagePath = "./png/premiere.jpg";
//     classPath = "premiere-icon square-icon-size adobe-icons";
//     textPath = "Adobe Premiere Pro";
//     textInside = "Pr";
//   } else if ($(this).hasClass("_click_photoshop")) {
//     imagePath = "./png/photoshop.png";
//     classPath = "photoshop-icon square-icon-size adobe-icons";
//     textPath = "Adobe Photoshop";
//     textInside = "Ps";
//   } else if ($(this).hasClass("_click_xD")) {
//     imagePath = "./png/photoshop2.webp";
//     classPath = "afterEffect-icon square-icon-size adobe-icons";
//     textPath = "Adobe After Effects";
//     textInside = "Ae";
//   }
//   let modalClone = $("._modal_adobe").first().clone();
//   modalClone
//     .find(".divPictureAdobe")
//     .css("background-image", "url(" + imagePath + ")");
//   modalClone
//     .find("._img_bottom_adobe")
//     .css("background-image", "url(" + image_bPath + ")");
//   modalClone.find("._img_adobe").addClass(classPath);
//   modalClone.find("._title_adobe").text(textPath); // update text
//   modalClone.find("._text_inside").text(textInside); // update text
//   $(this).prop("disabled", true);
//   modalClone.appendTo("body").show();
// });

