const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const errorMsg = document.getElementById("errorMsg");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const avatar = document.getElementById("avatar").value.trim();
    console.log(password.value, confirmPassword.value);
    if (password.value !== confirmPassword.value) {
      errorMsg.textContent = "Passwords do not match";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password: password.value, avatar }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "index.html";
      } else {
        errorMsg.textContent = data.message;
      }
    } catch (err) {
      errorMsg.textContent = "Something went wrong";
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.accessToken);
        // window.location.href = "dashboard.html";
      } else {
        errorMsg.textContent = data.message;
      }
    } catch (err) {
      errorMsg.textContent = "Login failed.";
    }
  });
}
