function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "index.html";
}
