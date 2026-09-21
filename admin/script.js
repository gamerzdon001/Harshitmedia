/* =========================================================
   HARSHIT MEDIA EDIT
   ADMIN LOGIN SCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   ADMIN CREDENTIALS
   ========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {
  LOGIN: "adminLoggedIn",
  REMEMBER: "adminRememberMe",
  SESSION_TIME: "adminLoginTime"
};

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

const rememberMe = document.getElementById("rememberMe");

const loginButton = document.getElementById("loginButton");
const buttonText = loginButton
  ? loginButton.querySelector(".button-text")
  : null;

const buttonLoader = loginButton
  ? loginButton.querySelector(".button-loader")
  : null;

const loginError = document.getElementById("loginError");
const loginSuccess = document.getElementById("loginSuccess");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  setCurrentYear();

  loadRememberedUsername();

  checkExistingLogin();

  setupPasswordToggle();

  setupLoginForm();

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function setCurrentYear() {

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

}


/* =========================================================
   CHECK EXISTING LOGIN
   ========================================================= */

function checkExistingLogin() {

  const sessionLogin =
    sessionStorage.getItem(STORAGE_KEYS.LOGIN);

  const savedLogin =
    localStorage.getItem(STORAGE_KEYS.LOGIN);

  if (sessionLogin === "true" || savedLogin === "true") {

    redirectToDashboard();

  }

}


/* =========================================================
   LOAD REMEMBERED USERNAME
   ========================================================= */

function loadRememberedUsername() {

  const savedUsername =
    localStorage.getItem("adminUsername");

  const savedRemember =
    localStorage.getItem(STORAGE_KEYS.REMEMBER);

  if (savedUsername && savedRemember === "true") {

    if (usernameInput) {
      usernameInput.value = savedUsername;
    }

    if (rememberMe) {
      rememberMe.checked = true;
    }

  }

}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function setupPasswordToggle() {

  if (!togglePassword || !passwordInput) {
    return;
  }

  togglePassword.addEventListener("click", () => {

    const isPassword =
      passwordInput.type === "password";

    if (isPassword) {

      passwordInput.type = "text";

      togglePassword.setAttribute(
        "aria-label",
        "Hide password"
      );

      updateEyeIcon(true);

    } else {

      passwordInput.type = "password";

      togglePassword.setAttribute(
        "aria-label",
        "Show password"
      );

      updateEyeIcon(false);

    }

    passwordInput.focus();

  });

}


/* =========================================================
   EYE ICON
   ========================================================= */

function updateEyeIcon(isVisible) {

  if (!eyeIcon) {
    return;
  }

  if (isVisible) {

    eyeIcon.innerHTML = `
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z">
      </path>

      <path
        d="M4 4l16 16">
      </path>
    `;

  } else {

    eyeIcon.innerHTML = `
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z">
      </path>

      <circle
        cx="12"
        cy="12"
        r="3">
      </circle>
    `;

  }

}


/* =========================================================
   LOGIN FORM
   ========================================================= */

function setupLoginForm() {

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", handleLogin);

}


/* =========================================================
   HANDLE LOGIN
   ========================================================= */

function handleLogin(event) {

  event.preventDefault();

  clearMessages();

  const username =
    usernameInput
      ? usernameInput.value.trim()
      : "";

  const password =
    passwordInput
      ? passwordInput.value
      : "";

  const shouldRemember =
    rememberMe
      ? rememberMe.checked
      : false;


  /* ---------------------------------------------
     VALIDATION
     --------------------------------------------- */

  if (!username) {

    showError("Please enter your username.");

    if (usernameInput) {
      usernameInput.focus();
    }

    return;

  }


  if (!password) {

    showError("Please enter your password.");

    if (passwordInput) {
      passwordInput.focus();
    }

    return;

  }


  /* ---------------------------------------------
     SHOW LOADING
     --------------------------------------------- */

  setLoading(true);


  /* ---------------------------------------------
     SMALL DELAY FOR BETTER UX
     --------------------------------------------- */

  setTimeout(() => {

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {

      handleSuccessfulLogin(
        username,
        shouldRemember
      );

    } else {

      handleFailedLogin();

    }

  }, 500);

}


/* =========================================================
   SUCCESSFUL LOGIN
   ========================================================= */

function handleSuccessfulLogin(
  username,
  shouldRemember
) {

  /* ---------------------------------------------
     SAVE LOGIN SESSION
     --------------------------------------------- */

  sessionStorage.setItem(
    STORAGE_KEYS.LOGIN,
    "true"
  );

  sessionStorage.setItem(
    STORAGE_KEYS.SESSION_TIME,
    Date.now().toString()
  );


  /* ---------------------------------------------
     REMEMBER USER
     --------------------------------------------- */

  if (shouldRemember) {

    localStorage.setItem(
      STORAGE_KEYS.LOGIN,
      "true"
    );

    localStorage.setItem(
      STORAGE_KEYS.REMEMBER,
      "true"
    );

    localStorage.setItem(
      "adminUsername",
      username
    );

  } else {

    localStorage.removeItem(
      STORAGE_KEYS.LOGIN
    );

    localStorage.removeItem(
      STORAGE_KEYS.REMEMBER
    );

    localStorage.removeItem(
      "adminUsername"
    );

  }


  /* ---------------------------------------------
     SUCCESS MESSAGE
     --------------------------------------------- */

  showSuccess("Login successful. Opening dashboard...");


  /* ---------------------------------------------
     REDIRECT
     --------------------------------------------- */

  setTimeout(() => {

    redirectToDashboard();

  }, 700);

}


/* =========================================================
   FAILED LOGIN
   ========================================================= */

function handleFailedLogin() {

  setLoading(false);

  showError(
    "Invalid username or password."
  );

  if (passwordInput) {

    passwordInput.value = "";

    passwordInput.focus();

  }

}


/* =========================================================
   REDIRECT TO DASHBOARD
   ========================================================= */

function redirectToDashboard() {

  window.location.href = "dashboard.html";

}


/* =========================================================
   SHOW ERROR
   ========================================================= */

function showError(message) {

  if (!loginError) {
    return;
  }

  loginError.textContent = message;

  loginError.classList.add("show");

  if (loginSuccess) {
    loginSuccess.classList.remove("show");
  }

}


/* =========================================================
   SHOW SUCCESS
   ========================================================= */

function showSuccess(message) {

  if (!loginSuccess) {
    return;
  }

  loginSuccess.textContent = message;

  loginSuccess.classList.add("show");

  if (loginError) {
    loginError.classList.remove("show");
  }

}


/* =========================================================
   CLEAR MESSAGES
   ========================================================= */

function clearMessages() {

  if (loginError) {

    loginError.textContent = "";

    loginError.classList.remove("show");

  }

  if (loginSuccess) {

    loginSuccess.textContent = "";

    loginSuccess.classList.remove("show");

  }

}


/* =========================================================
   BUTTON LOADING STATE
   ========================================================= */

function setLoading(isLoading) {

  if (!loginButton) {
    return;
  }

  loginButton.disabled = isLoading;

  loginButton.classList.toggle(
    "loading",
    isLoading
  );


  if (buttonText) {

    buttonText.textContent =
      isLoading
        ? "Signing In..."
        : "Sign In";

  }


  if (buttonLoader) {

    buttonLoader.style.display =
      isLoading
        ? "inline-block"
        : "none";

  }

}


/* =========================================================
   ENTER KEY SUPPORT
   ========================================================= */

document.addEventListener("keydown", (event) => {

  if (event.key !== "Enter") {
    return;
  }

  const activeElement =
    document.activeElement;

  if (
    activeElement === usernameInput ||
    activeElement === passwordInput
  ) {

    if (loginForm) {

      event.preventDefault();

      loginForm.requestSubmit();

    }

  }

});


/* =========================================================
   INPUT ERROR RESET
   ========================================================= */

if (usernameInput) {

  usernameInput.addEventListener(
    "input",
    () => {

      clearMessages();

    }
  );

}


if (passwordInput) {

  passwordInput.addEventListener(
    "input",
    () => {

      clearMessages();

    }
  );

}


/* =========================================================
   PREVENT DOUBLE SUBMIT
   ========================================================= */

let loginProcessing = false;

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    (event) => {

      if (loginProcessing) {

        event.preventDefault();

        return;

      }

      loginProcessing = true;

      setTimeout(() => {

        loginProcessing = false;

      }, 1500);

    },
    true
  );

}


/* =========================================================
   GLOBAL LOGOUT FUNCTION
   ========================================================= */

function logoutAdmin() {

  sessionStorage.removeItem(
    STORAGE_KEYS.LOGIN
  );

  sessionStorage.removeItem(
    STORAGE_KEYS.SESSION_TIME
  );

  localStorage.removeItem(
    STORAGE_KEYS.LOGIN
  );

  window.location.href = "index.html";

}


/* =========================================================
   GLOBAL AUTH CHECK
   ========================================================= */

function isAdminLoggedIn() {

  const sessionLogin =
    sessionStorage.getItem(STORAGE_KEYS.LOGIN);

  const localLogin =
    localStorage.getItem(STORAGE_KEYS.LOGIN);

  return (
    sessionLogin === "true" ||
    localLogin === "true"
  );

}


/* =========================================================
   PROTECT ADMIN PAGES
   ========================================================= */

function protectAdminPage() {

  if (!isAdminLoggedIn()) {

    window.location.href = "index.html";

    return false;

  }

  return true;

}


/* =========================================================
   AUTO-PROTECT ADMIN PAGES
   ========================================================= */

const protectedPages = [
  "dashboard.html",
  "videos.html",
  "upload.html",
  "messages.html",
  "settings.html"
];

const currentPage =
  window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();


if (protectedPages.includes(currentPage)) {

  protectAdminPage();

}


/* =========================================================
   SESSION TIME
   ========================================================= */

function getLoginTime() {

  const sessionTime =
    sessionStorage.getItem(
      STORAGE_KEYS.SESSION_TIME
    );

  if (!sessionTime) {
    return null;
  }

  return Number(sessionTime);

}


/* =========================================================
   OPTIONAL SESSION EXPIRY
   ========================================================= */

function checkSessionExpiry() {

  const loginTime =
    getLoginTime();

  if (!loginTime) {
    return;
  }

  /*
     Session timeout:
     24 hours
  */

  const SESSION_DURATION =
    24 * 60 * 60 * 1000;

  const currentTime =
    Date.now();

  if (
    currentTime - loginTime >
    SESSION_DURATION
  ) {

    logoutAdmin();

  }

}


/* =========================================================
   RUN SESSION CHECK
   ========================================================= */

if (protectedPages.includes(currentPage)) {

  checkSessionExpiry();

}


/* =========================================================
   EXPORT GLOBAL FUNCTIONS
   ========================================================= */

window.logoutAdmin =
  logoutAdmin;

window.isAdminLoggedIn =
  isAdminLoggedIn;

window.protectAdminPage =
  protectAdminPage;


/* =========================================================
   END OF SCRIPT
   ========================================================= */
