const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "brennan" && password === "cyberquest") {

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid username or password.");

    }
});