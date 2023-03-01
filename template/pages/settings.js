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
  var date = new Date(),
      hour = date.getHours(),
      minute = checkTime(date.getMinutes()),
      ss = checkTime(date.getSeconds());

  function checkTime(i) {
    if( i < 10 ) {
      i = "0" + i;
    }
    return i;
  }

if ( hour > 12 ) {
  hour = hour - 12;
  if ( hour == 12 ) {
    hour = checkTime(hour);
  document.getElementById("t_date").innerHTML = hour+":"+minute+":"+ss+" AM";
  }
  else {
    hour = checkTime(hour);
    document.getElementById("t_date").innerHTML = hour+":"+minute+":"+ss+" PM";
  }
}
else {
  document.getElementById("t_date").innerHTML = hour+":"+minute+":"+ss+" AM";;
}
var time = setTimeout(startTime,1000);
}