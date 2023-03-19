console.log("start settings");
//  append nav bar to all boxes
function g_append() {
  let title = 'Luna';
  let _TopNavBox = `<div class="container_top_nav_boxes">
<div class="topnav-items-box">
<div class ='circle circle1 close_box'></div>
<div class ='circle circle2'></div>
<div class ='circle circle3'></div>
</div>
<div class="text_boxes_nav drag-header">${title}</div>
</div>`;

  $(".insert_header_box").append(_TopNavBox);

  let _FooterNav = `
<div class="settings_pannel_all">
  <a href="#"><span class="material-symbols-outlined">
    settings
    </span> Settings</a>
</div>
<div>25 items, 280.63 GB available</div>
<div>Marian Iordache</div>
`
  $(".footer_insert_pages").append(_FooterNav);

}
$(".contact_push").each(function() {
 
  $(this).load("./pages/_finder_tabs/forms/forms.html");
 });

function appendStuff() {
  $(".nav_checkBox").append(
    `<input type="checkbox" class="checkBox_nav" checked>`
  );
}
// call typewriter function

let typeWritting = document.getElementById("box_terminal");

typeWritting.addEventListener("click", function () {
  typewriter();
});
let all_links = document.querySelector(".all_links")
all_links.click();
let defaultOpen = document.getElementById("defaultOpen")
defaultOpen.click();


//  open all nav top header items

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


//  add time to nav header

export function startTime() {
  let date = new Date(),
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
  // let time = setTimeout(startTime, 1000);
  // console.log(time,"time");
}

//  click all buttons with class box_open and display modal for different box
const _modals = document.querySelectorAll(`div[id^="modal_"]`);
export function clickDivs() {
  g_append();
  const _boxes = document.querySelectorAll(".box_open");

  console.log(_modals, "modals");
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

//  drag all windows with class drag-only

export function dragWindows() {
  const draggableElements = document.querySelectorAll(".drag-only");
  console.log(draggableElements, "dragElements")
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
      const newTop = draggableElement.offsetTop - pos2;
      // console.log(newTop, "newTop");
      if (newTop >= 40) {
        draggableElement.style.top = newTop + "px";
      } else {
        draggableElement.style.top = "40px";
      }
      // draggableElement.style.top = draggableElement.offsetTop - pos2 + "px";
      draggableElement.style.left = draggableElement.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  });
}


//  Splash screen adobe pop up
console.log("test");
$("._modal_adobe").hide();


let adobe_pius = document.querySelector(".section4_middle_grid");
$(".adobe-icons").one("click", function (values) {
  let splash_adobe = document.querySelector(".splash_adobe");
  console.log(splash_adobe, "spal");
  let imagePath = "";
  let image_bPath = "./assets/png/_adobe/cloudLogo.png";
  let classPath = "";
  let textPath = "";
  let textInside = "";
  if ($(this).hasClass("_click_premiere")) {
    imagePath = "./assets/png/_adobe/premiere.webp";
    classPath = "premiere-icon square-icon-size adobe-icons";
    textPath = "Adobe Premiere Pro";
    textInside = "Pr";
  } else if ($(this).hasClass("_click_photoshop")) {
    imagePath = "./assets/png/_adobe/photoshop.webp";
    classPath = "photoshop-icon square-icon-size adobe-icons";
    textPath = "Adobe Photoshop";
    textInside = "Ps";
  } else if ($(this).hasClass("_click_xD")) {
    imagePath = "./assets/png/_adobe/xds.webp";
    classPath = "adobe-xd-icon square-icon-size adobe-icons";
    textPath = "Adobe XD";
    textInside = "XD";
  } else if ($(this).hasClass("_click_afterEffects")) {
    imagePath = "./assets/png/_adobe/afterE.webp";
    classPath = "afterEffect-icon square-icon-size adobe-icons";
    textPath = "Adobe After Effects";
    textInside = "AE";
  }
  let modalClone = $("._modal_adobe").first().clone();
  modalClone
    .find(".divPictureAdobe")
    .css("background-image", "url(" + imagePath + ")");
  modalClone
    .find("._img_bottom_adobe")
    .css("background-image", "url(" + image_bPath + ")");
  modalClone.find("._img_adobe").addClass(classPath);
  modalClone.find("._title_adobe").text(textPath); // update text
  modalClone.find("._text_inside").text(textInside); // update text
  // $(this).prop("disabled", true);
  modalClone.appendTo(adobe_pius).show()
  setTimeout(function () {
    $("._modal_adobe").hide();
    openAdobe(values.currentTarget);
  }, 2000);
  // 
})

function openAdobe(currentTarget) {
  setTimeout(function () {
    if ($(currentTarget).hasClass("_click_premiere")) {
      $(".premiere_push ").css("display", "block");
    } else if ($(currentTarget).hasClass("_click_xD")) {
      $(".xD_push").css("display", "block");
    } else if ($(currentTarget).hasClass("_click_afterEffects")) {
      $(".afterEffects_push").css("display", "block");
    } else if ($(currentTarget).hasClass("_click_photoshop")) {
      $(".photoshop_push").css("display", "block");
    }
    console.log("inside")
  }, 500);
  $(".close_box").one("click", function () {
    $(this).closest(".drag-only").css("display", "none");
  });
}
console.log("page is fully loaded");

// document.getElementById('start-button').addEventListener('click', startCountdown);