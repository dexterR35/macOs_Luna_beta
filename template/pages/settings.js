// console.log("exportNavLink");

let title = "Marian Iordache";

let _TopNavBox = `<div class="container_top_nav_boxes">
<div class="topnav-items-box">
<div class ='circle circle1 close_box'></div>
<div class ='circle circle2'></div>
<div class ='circle circle3'></div>
</div>
<div class="text_boxes_nav drag-header">${title}</div>
</div>`;

$(".insert_header_box").append(_TopNavBox);

function appendStuff() {
  $(".nav_checkBox").append(
    `<input type="checkbox" class="checkBox_nav" checked>`
  );
}

export function openNavLink() {
  let dropBtns = document.querySelectorAll(".dropdown-button");
  // console.log(dropBtns, "dropBtns");
  dropBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let dropContent = btn.querySelector(".dropMenu-list"),
        shouldOpen = !dropContent.classList.contains("show");
      e.preventDefault();
      // First close all open items.
      closeOpenItems();
      // Check if the clicked item should be opened. It is already closed at this point so no further action is required if it should be closed.
      if (shouldOpen) {
        // console.log(shouldOpen, "boolean");
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
}

// let rangeInput = document.getElementById("rangeInput");
// let output = document.getElementById("output");

// output.innerHTML = rangeInput.value;

// rangeInput.oninput = function() {
//   output.innerHTML = this.value;
// }

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
      document.getElementById("t_date").innerHTML =
        hour + ":" + minute + ":" + ss + " AM";
    } else {
      hour = checkTime(hour);
      document.getElementById("t_date").innerHTML =
        hour + ":" + minute + ":" + ss + " PM";
    }
  } else {
    document.getElementById("t_date").innerHTML =
      hour + ":" + minute + ":" + ss + " AM";
  }
  var time = setTimeout(startTime, 1000);
}

export function clickDivs() {
  const _boxes = document.querySelectorAll(".box_open");
  const _modals = document.querySelectorAll(`div[id^="modal_"]`);
  // console.log(_modals, "modals");
  _boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const modalIds = box.getAttribute("data-modal").split(",");
      modalIds.forEach((modalId) => {
        const modal = document.getElementById(modalId);
        if (modal.style.display !== "block") {
          modal.style.display = "block";
        }
      });
      // closeModal();
    });
  });

  _modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".close_box");
    // console.log(closeBtn);
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  // function closeModal() {
  //   _modals.forEach(modal => {
  //     if (modal.style.display === "block") {
  //       modal.style.display = "none";
  //     }
  //   });
  // }
}

export function dragWindows() {
  const draggableElements = document.querySelectorAll(".drag-only");
  console.log(draggableElements,"test")
  draggableElements.forEach((draggableElement) => {
    const header = draggableElement.querySelector(".drag-header");
    header.addEventListener("mousedown", dragMouseDown);

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      draggableElement.style.top = draggableElement.offsetTop - pos2 + "px";
      draggableElement.style.left = draggableElement.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  });
}


