console.log("start index")


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
fetchHTMLContent("./pages/p_adobe/p_premiere.html", ".premiere_push");

// end fetch all html file with export function

// load all html file same as fetch but one dif , this have script inside html

$("#chrome_push").load("./pages/chrome/chrome.html");
$("#customize_push").load("./pages/customize/customize.html");
$("#finder_push").load("./pages/finder/finder.html");
$("#terminal_push").load("./pages/terminal/terminal.html");
$("#adobe_push").load("./pages/s_adobe/s_adobe.html");
// $("#premiere_push").load("./pages/p_adobe/p_premiere.html");
$("#xD_push").load("./pages/p_adobe/p_xd.html");
$("#photoshop_push").load("./pages/p_adobe/p_photoshop.html");
$("#afterEffects_push").load("./pages/p_adobe/p_afterEffects.html");
$("#apps_push").load("./pages/apps/apps.html");

$("#network_push").load("./pages/network/network.html");
$("#admin_push").load("./pages/admin/admin.html");


$("#avatars_push").load("./pages/_avatars/avatars.html");
$("#await_push").load("./pages/_boot/_await/await.html");
console.log("end index");



function openPage(pageName, elmnt, color,event,tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(".all_links");
  // console.log(tablinks, "tabs")
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  let pageNameDisplay = document.getElementById(pageName);
  // console.log(pageNameDisplay, "pagename")
  pageNameDisplay.style.display = "block";
  // elmnt.style.backgroundColor = color;
  // Show the current tab, and add an "active" class to the button that opened the tab
  // document.getElementById(tabName).style.display = "block";
  // event.currentTarget.className += " active";
}

// function openTab(event, tabName) {
//   // Get all elements with class="tabcontent" and hide them
//   var tabcontent = document.getElementsByClassName("tabcontent");
//   for (var i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//   }

//   // Get all elements with class="tablinks" and remove the class "active"
//   var tablinks = document.getElementsByClassName("tablinks");
//   for (var i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }

//   // Show the current tab, and add an "active" class to the button that opened the tab
//   document.getElementById(tabName).style.display = "block";
//   event.currentTarget.className += " active";
// }






// call typewriter function


