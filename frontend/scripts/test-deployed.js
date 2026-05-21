import axios from "axios";

const API = "https://week-9-10-kn3e.onrender.com";

const AUTHOR_CREDS = {
  email: "vikas.author@example.com",
  password: "Author@12345",
};

async function run() {
  try {
    console.log("Logging in as author...");
    const loginRes = await axios.post(`${API}/common-api/login`, AUTHOR_CREDS, { withCredentials: true });
    console.log("Login response status:", loginRes.status);
    const token = loginRes.data?.token;
    if (!token) {
      console.warn("No token returned in login response. Response body:", loginRes.data);
    } else {
      console.log("Received token (trimmed):", token.slice(0, 20) + "...");
    }

    console.log("Calling check-auth with Authorization header...");
    const checkRes = await axios.get(`${API}/common-api/check-auth`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });
    console.log("check-auth status:", checkRes.status, "user:", checkRes.data.payload?.email || checkRes.data.payload?.firstName || checkRes.data.payload);

    console.log("Fetching user articles...");
    const articlesRes = await axios.get(`${API}/user-api/articles`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });
    console.log("user-api/articles status:", articlesRes.status, "count:", articlesRes.data.payload?.length);

    console.log("Publishing a test article (author API)...");
    const article = {
      author: checkRes.data.payload?._id || "",
      title: "Automated test article",
      category: "testing",
      content: "This is a test article created by an automated script.",
    };

    const publishRes = await axios.post(`${API}/author-api/articles`, article, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });
    console.log("publish status:", publishRes.status, "articleId:", publishRes.data.payload?._id || publishRes.data.payload);

    console.log("Test script completed successfully.");
  } catch (err) {
    console.error("Test script error:", err.response ? err.response.data : err.message);
    process.exitCode = 1;
  }
}

run();
