const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function (e) {
e.preventDefault();

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value;

if (username === "admin" && password === "admin123") {

    localStorage.setItem("adminLoggedIn", "true");

    window.location.href = "./dashboard.html";

} else {
    errorMessage.textContent = "Invalid username or password.";
}

});
if (
    window.location.pathname.endsWith("/dashboard.html") ||
    window.location.pathname.endsWith("/upload.html") ||
    window.location.pathname.endsWith("/videos.html") ||
    window.location.pathname.endsWith("/messages.html") ||
    window.location.pathname.endsWith("/settings.html")
) {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "index.html";
    }
}
