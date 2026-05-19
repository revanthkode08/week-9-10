import axios from "axios";

async function testLogin() {
  try {
    let res = await axios.post("https://suntek-assignment-syl5.onrender.com/common-api/login", {}, { withCredentials: true });
    console.log("Success:", res.data);
  } catch (err) {
    console.log("Error details:");
    console.log("err.response.data:", err.response?.data);
    console.log("err.message:", err.message);
  }
}

testLogin();
