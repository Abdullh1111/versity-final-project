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

  const showCreatePostBtn = document.getElementById("showCreatePostBtn");
  const createPostForm = document.getElementById("createPostForm");
  const newPostTitle = document.getElementById("newPostTitle");
  const newPostContent = document.getElementById("newPostContent");
  const cancelCreatePostBtn = document.getElementById("cancelCreatePost");
  const postsList = document.getElementById("postsList");

  // Helper: create post DOM element with edit & delete buttons
  function createPostElement(post) {
    const div = document.createElement("div");
    div.className = "post";
    div.dataset.id = post.id;

    const title = document.createElement("div");
    title.className = "post-title";
    title.textContent = post.title;

    const content = document.createElement("div");
    content.className = "post-content";
    content.textContent = post.content;

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "post-buttons";

    // Update button
    const updateBtn = document.createElement("button");
    updateBtn.className = "update-btn";
    updateBtn.textContent = "Update";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    buttonsDiv.appendChild(updateBtn);
    buttonsDiv.appendChild(deleteBtn);

    div.appendChild(title);
    div.appendChild(content);
    div.appendChild(buttonsDiv);

    // Update functionality (simplified: prompt user)
    updateBtn.addEventListener("click", async () => {
      const newTitle = prompt("Update Title:", title.textContent);
      if (newTitle === null) return; // cancel

      const newContent = prompt("Update Content:", content.textContent);
      if (newContent === null) return;

      try {
        const res = await fetch(`http://localhost:5000/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle, content: newContent }),
        });

        if (!res.ok) {
          const errData = await res.json();
          alert(errData.message || "Failed to update post");
          return;
        }

        title.textContent = newTitle;
        content.textContent = newContent;
      } catch (err) {
        alert("Server error updating post");
        console.error(err);
      }
    });

    // Delete functionality
    deleteBtn.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to delete this post?")) return;

      try {
        const res = await fetch(`http://localhost:5000/api/posts/${post.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          alert(errData.message || "Failed to delete post");
          return;
        }

        div.remove();
      } catch (err) {
        alert("Server error deleting post");
        console.error(err);
      }
    });

    return div;
  }

  // Function to render posts (call your existing fetch posts and use this)
  async function renderPosts() {
    postsList.innerHTML = "";

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      const posts = data.posts || [];

      if (posts.length === 0) {
        postsList.textContent = "You have no posts yet.";
      } else {
        posts.forEach((post) => {
          postsList.appendChild(createPostElement(post));
        });
      }
    } catch (err) {
      alert("Error loading posts");
      console.error(err);
    }
  }

  // Show create post form
  showCreatePostBtn.addEventListener("click", () => {
    createPostForm.classList.remove("hidden");
    showCreatePostBtn.disabled = true;
  });

  // Cancel create post
  cancelCreatePostBtn.addEventListener("click", () => {
    createPostForm.reset();
    createPostForm.classList.add("hidden");
    showCreatePostBtn.disabled = false;
  });

  // Handle create post submit
  createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = newPostTitle.value.trim();
    const content = newPostContent.value.trim();

    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Failed to create post");
        return;
      }

      const newPost = await res.json();

      postsList.prepend(createPostElement(newPost.post || newPost));

      createPostForm.reset();
      createPostForm.classList.add("hidden");
      showCreatePostBtn.disabled = false;
    } catch (err) {
      alert("Server error creating post");
      console.error(err);
    }
  });
});
