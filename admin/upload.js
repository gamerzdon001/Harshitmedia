const videoFile = document.getElementById("videoFile");
const thumbnail = document.getElementById("thumbnail");

const fileName = document.getElementById("fileName");
const thumbnailName = document.getElementById("thumbnailName");

const uploadForm = document.getElementById("uploadForm");
const statusMessage = document.getElementById("statusMessage");

videoFile.addEventListener("change", function () {

if (videoFile.files.length > 0) {
    fileName.textContent = videoFile.files[0].name;
}

});

thumbnail.addEventListener("change", function () {

if (thumbnail.files.length > 0) {
    thumbnailName.textContent = thumbnail.files[0].name;
}

});

uploadForm.addEventListener("submit", function (e) {

e.preventDefault();

const title = document.getElementById("videoTitle").value;

statusMessage.textContent =
    `"${title}" is ready to upload. Storage connection will be added next.`;

});

function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "index.html";
}
