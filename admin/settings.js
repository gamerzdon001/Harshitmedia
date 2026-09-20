const inputs = document.querySelectorAll(
    ".settings-card input, .settings-card textarea"
);

const savedSettings = JSON.parse(
    localStorage.getItem("harshitSettings") || "{}"
);

inputs.forEach((input, index) => {
    if (savedSettings[index]) {
        input.value = savedSettings[index];
    }
});
document.querySelectorAll(".save-btn").forEach((button) => {

    button.addEventListener("click", function () {

        const values = [];

        inputs.forEach((input) => {
            values.push(input.value);
        });

        localStorage.setItem(
            "harshitSettings",
            JSON.stringify(values)
        );

        const originalText = button.textContent;

        button.textContent = "Saved ✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });

});
function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "index.html";
}
