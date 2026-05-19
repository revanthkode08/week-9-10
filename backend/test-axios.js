import axios from "axios";

async function testLogin() {
  try {
    let res = await axios.post("http://localhost:4000/common-api/login", { email: "you@example.com", password: "wrongpassword" });
    console.log("Success:", res.data);
  } catch (err) {
    console.log("Error details:");
    console.log("err.response.data:", err.response?.data);
    console.log("err.message:", err.message);
  }
}

testLogin();
