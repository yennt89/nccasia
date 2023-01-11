const btnPopup = document.getElementsByClassName("sub-button");
const btnPopupMobile = document.querySelector(".sub-button2");
const btnSendProject = document.getElementsByClassName("button-primary");
const btnCancelPopupMobile = document.querySelector(".btn-cancel");
const popup = document.querySelector(".modal");
const popupMobile = document.querySelector(".mobile-modal");
const btnSendPopup = document.querySelector(".modal_popup_main button");
const inputPopup = document.querySelector(".modal-input");
btnCancelPopupMobile.addEventListener("click", function () {
  popupMobile.classList.add("hidePopup");
});
// Click outside Popup
let category = 0;
popup.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    popup.classList.add("hidePopup");
    inputPopup.value = "";
  }
});

//Event Click  show popup
function handleTogglePopup() {
  popup.style.display = "block";
}
for (var i = 0; i < btnPopup.length; i++) {
  btnPopup[i].addEventListener("click", function (e) {
    handleTogglePopup();
    category = e.target.dataset.id;
  });
}
btnPopupMobile.addEventListener("click", function () {
  popupMobile.style.display = "block";
});
//event add animation when close
popup.addEventListener("animationend", function () {
  if (this.classList.contains("hidePopup")) {
    this.style.display = "none";
    validateEmailCasestudy.style.display = "none";
    this.classList.remove("hidePopup");
  }
});
popupMobile.addEventListener("animationend", function () {
  if (this.classList.contains("hidePopup")) {
    this.style.display = "none";
    this.classList.remove("hidePopup");
  }
});

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const formSendEmail = document.querySelector(".send-email");
const validateEmailCasestudy = document.querySelector(
  ".validate-email-casestudy"
);
formSendEmail.addEventListener("click", (event) => {
  validateEmailCasestudy.style.display = "none";
  event.preventDefault();
  const email = document.getElementById("email-project").value;
  if (email == "") {
    return (validateEmailCasestudy.style.display = "block");
  }
  if (!validateEmail(email)) {
    return (validateEmailCasestudy.style.display = "block");
  }
  fetch("https://email.ncc.asia/ncc-site-api-sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      type: "case_study",
      category: category,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        printMess(
          "nameSuccess",
          "Thank you, your submission has been received."
        );
        formEl.reset();
      } else {
        printMess("nameError", `${result.message}`);
      }
    })
    .catch((err) => {
      printMess(
        "nameError",
        "Oops, something went wrong. Please try again later."
      );
    });
  popup.classList.add("hidePopup");
});
