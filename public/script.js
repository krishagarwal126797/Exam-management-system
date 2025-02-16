document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
  }

  // Toggle Light/Dark Mode
  themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark");
          themeToggle.textContent = "☀️";
      } else {
          localStorage.setItem("theme", "light");
          themeToggle.textContent = "🌙";
      }
  });
  
});
document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password i");

  togglePassword.addEventListener("click", () => {
      if (passwordField.type === "password") {
          passwordField.type = "text";
          togglePassword.classList.remove("fa-eye");
          togglePassword.classList.add("fa-eye-slash");
      } else {
          passwordField.type = "password";
          togglePassword.classList.remove("fa-eye-slash");
          togglePassword.classList.add("fa-eye");
      }
  });
});

