console.log("start index");

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


// Usage:
fetchHTMLContent("./pages/header/header.html", "#header-container");
fetchHTMLContent("./pages/icons/icons.html", "#footer-container");
fetchHTMLContent("./pages/linkdin/linkdin.html", ".linkedin_push");
fetchHTMLContent("./pages/github/github.html", ".github_push");
// fetchHTMLContent("./pages/chrome/chrome.html", ".chrome_push");
$("#chrome_push").load("./pages/chrome/chrome.html");

function openModalBG() {
    document.getElementById("bg_change").style.display = "block";
  }
  
  function selectImage(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    closeModalBG();
  }
  
  function closeModalBG() {
    document.getElementById("bg_change").style.display = "none";
  }


