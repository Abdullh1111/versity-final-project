document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const taskList = document.getElementById("taskList");
  const username = document.getElementById("username");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!res.ok) {
      localStorage.removeItem("token");
      window.location.href = "index.html";
      return;
    }

    username.textContent = `Hello, ${data.user.name}`;
    data.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.title;
      taskList.appendChild(li);
    });
  } catch (err) {
    alert("Auth error. Redirecting...");
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});
