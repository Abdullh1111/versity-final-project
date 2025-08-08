document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const userAvatar = document.getElementById("userAvatar");
  const userFullName = document.getElementById("userFullName");
  const logoutBtn = document.getElementById("logoutBtn");
  const postsContainer = document.getElementById("postsContainer");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  function createPostElement(post) {
    const div = document.createElement("div");
    div.className = "post";

    const title = document.createElement("div");
    title.className = "post-title";
    title.textContent = post.title;

    const content = document.createElement("div");
    content.className = "post-content";
    content.textContent = post.content;

    div.appendChild(title);
    div.appendChild(content);

    return div;
  }

  try {
    // Fetch user info (implement /api/me in your backend)
    const userRes = await fetch("http://localhost:5000/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userRes.ok) throw new Error("Failed to fetch user info");

    const userData = await userRes.json();

    userAvatar.src = userData.data.avatar || "https://via.placeholder.com/40";
    userFullName.textContent = userData.data.fullName || "User";

    // Fetch posts
    const postsRes = await fetch("http://localhost:5000/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!postsRes.ok) throw new Error("Failed to fetch posts");

    const postsData = await postsRes.json();
    const posts = postsData.posts || [];

    if (posts.length === 0) {
      const noPosts = document.createElement("p");
      noPosts.textContent = "You have no posts yet.";
      postsContainer.appendChild(noPosts);
    } else {
      posts.forEach((post) => {
        const postEl = createPostElement(post);
        postsContainer.appendChild(postEl);
      });
    }
  } catch (err) {
    console.error(err);
    alert("Authentication failed or server error. Redirecting to login.");
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});
