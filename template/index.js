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



console.log("end index");



function openPage(pageName, elmnt, color) {
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

}





// call typewriter function


