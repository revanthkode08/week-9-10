import { create } from "zustand";
import axios from "axios";

// Ensure axios points to the deployed backend by default (can be overridden by VITE env)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://week-9-10-kn3e.onrender.com";
// Send cookies by default to support cookie-based auth; Authorization header is also supported
axios.defaults.withCredentials = true;

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredWithRole) => {
    const { role, ...userCredObj } = userCredWithRole;
    try {
      //set loading true
      set({ loading: true, error: null });
      //make api call
      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/common-api/login`,
        userCredObj,
        { withCredentials: true }
      );

      // If server returns a token in body, set Authorization header for subsequent requests
      const token = res.data?.token;
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // persist token locally for page reloads
        localStorage.setItem("token", token);
      }

      // update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload, //{message:"",payload:}
      });
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        //error: err,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      //set loading state
      set({ loading: true, error: null });
      //make logout api req
      await axios.get(`${import.meta.env.VITE_API_URL}/common-api/logout`, { withCredentials: true });
      // clear local token and axios header
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      //update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/common-api/check-auth`,
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          withCredentials: true,
        }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

// On module load, if token exists in localStorage, set axios auth header
const existingToken = localStorage.getItem("token");
if (existingToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${existingToken}`;
}
