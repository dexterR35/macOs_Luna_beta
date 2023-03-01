console.log("exportNavLink");
export function openNavLink() {
  let dropBtns = document.querySelectorAll(".dropdown-button");
  console.log(dropBtns, "dropBtns");
  dropBtns.forEach(function (btn) {

    btn.addEventListener("click", function (e) {
      let dropContent = btn.querySelector(".dropMenu-list"),
        shouldOpen = !dropContent.classList.contains("show");
      e.preventDefault();
      // First close all open items.
      closeOpenItems();
      // Check if the clicked item should be opened. It is already closed at this point so no further action is required if it should be closed.
      if (shouldOpen) {
        console.log(shouldOpen, "boolean");
        // Open the clicked item.
        dropContent.classList.add("show");
      }
      e.stopPropagation();
    });
  });

  function closeOpenItems() {
    let openMenus = document.querySelectorAll(".dropMenu-list");
    openMenus.forEach(function (menus) {
      menus.classList.remove("show");
    });
  }
  window.addEventListener("click", function (event) {
    if (event.target != dropBtns) {
      closeOpenItems();
    }
  });
  appendStuff();
};

// let rangeInput = document.getElementById("rangeInput");
// let output = document.getElementById("output");

// output.innerHTML = rangeInput.value;

// rangeInput.oninput = function() {
//   output.innerHTML = this.value;
// }


function appendStuff() {
  $(".nav_checkBox").append(`<input type="checkbox" class="checkBox_nav" checked>`)
}

export function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  // ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 12 : hr;
  hr = (hr > 12) ? hr - 12 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  document.getElementById("clock").innerHTML = hr + ":" + min ;
  
  // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var curWeekDay = days[today.getDay()];
  // var curDay = today.getDate();
  // var curMonth = months[today.getMonth()];
  // var curYear = today.getFullYear();
  var date = curWeekDay;
  document.getElementById("date").innerHTML = date;
  
  var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}