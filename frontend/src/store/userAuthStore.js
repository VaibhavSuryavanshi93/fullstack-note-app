import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { signInWithGoogle } from "../firebase/firebase";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Error in signup");
      console.log("Error in signup", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in login", error);
    } finally {
      set({ isLogginingIn: false });
    }
  },
  loginWithGoogle: async () => {
    set({ isLogginingIn: true });
    try {
      const idToken = await signInWithGoogle();
      const res = await axiosInstance.post("/auth/google", {
        idToken,
      });
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in Google login");
      console.log("Error in Google login", error);
    } finally {
      set({ isLogginingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in logout", error);
      toast.error(error.response.data.message || "Error in logout");
    }
  },
  
}));
