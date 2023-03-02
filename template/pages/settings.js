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
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  if (hour > 12) {
    hour = hour - 12;
    if (hour == 12) {
      hour = checkTime(hour);
      document.getElementById("t_date").innerHTML = hour + ":" + minute + ":" + ss + " AM";
    } else {
      hour = checkTime(hour);
      document.getElementById("t_date").innerHTML = hour + ":" + minute + ":" + ss + " PM";
    }
  } else {
    document.getElementById("t_date").innerHTML = hour + ":" + minute + ":" + ss + " AM";;
  }
  var time = setTimeout(startTime, 1000);
}


export function clickDivs() {
  let openModals = [];

  const divs_box = document.querySelectorAll(`div[id^="box_"]`);
  console.log(divs_box)
  divs_box.forEach((divClick) => {
    divClick.addEventListener("click", () => {
      if (openModals.length < 6) {
        const divId = divClick.getAttribute('id');
        const modalId = `modal${divId.slice(3)}`;
        console.log(modalId, "div click");
        if (!openModals.includes(modalId)) {
          showModal(modalId);
          openModals.push(modalId);
        }
        // showModal(modalId);
      }
    });
  });
  console.log(openModals, "testt");

  function showModal(modalId) {

    const modal_box = document.getElementById(modalId);
    console.log(modal_box, "dladas");
    modal_box.style.display = "block";
    const closeButton = document.querySelector('.closeer');
    console.log(closeButton)
    closeButton.addEventListener('click', () => {
      hideModal(modalId);
      openModals = openModals.filter((id) => id !== modalId);
      // re-enable click events on the corresponding div
      const divId = modalId.slice(5);
      console.log(divId,"sssssssssssssssssssssssssssssssssssssssssssss")
      const divssss = document.querySelector(`box_${divId}`);
      divssss.style.pointerEvents = "block";
    });
    // disable click events on the corresponding div
    const divId = modalId.slice(0);
    console.log(divId,"fsafasfas")
    const div = document.getElementById(`box_${divId}`);
    div.style.pointerEvents = "none";
  }

  function hideModal(modalId) {
    const modalClose = document.getElementById(modalId);
    modalClose.style.display = "none";
  }

}