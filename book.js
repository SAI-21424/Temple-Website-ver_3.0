document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const usernameInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");

    // Create message element dynamically
    const message = document.createElement("p");
    form.appendChild(message);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            message.style.color = "orange";
            message.innerText = "Please fill all fields!";
            return;
        }

        if (username === "hello","sai" && password === "1234") {
            message.style.color = "green";
            message.innerText = "Login Successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            message.style.color = "red";
            message.innerText = "Invalid Username or Password!";
        }
    });

});