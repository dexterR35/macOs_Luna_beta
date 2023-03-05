console.log("start index");
// one http request for all css files

const cssUrls = [
  // 'appStyle.css',
  './pages/header/header.css',
  './pages/icons/icons.css',
  './pages/chrome/chrome.css',
  './pages/customize/customize.css',
  './pages/linkdin/linkdin.css',
  './pages/github/github.css'
];

Promise.all(cssUrls.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(res => res.text())))
  .then(texts => new Blob(texts, { type: 'text/css' }))
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

console.log("end index");



