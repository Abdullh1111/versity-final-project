document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const taskList = document.getElementById("taskList");
  const username = document.getElementById("username");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    // Fetch posts instead of tasks
    const res = await fetch("http://localhost:5000/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) {
      localStorage.removeItem("token");
      window.location.href = "index.html";
      return;
    }

    // Assuming backend returns { success: true, posts: [...], user: { name: "..." } }
    // If your backend doesn't return user, you'll have to fetch user info separately or decode token

    username.textContent = data.user
      ? `Hello, ${data.user.name}`
      : "Hello";

    // Clear previous list items if any
    taskList.innerHTML = "";

    // Show posts titles instead of tasks
    (data.posts || []).forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    // alert("Auth error. Redirecting...");
    // localStorage.removeItem("token");
    // window.location.href = "index.html";
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});
