import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const getNotes = () => axiosInstance.get("/notes");
export const createNote = (text) =>
  axiosInstance.post(
    "/notes",
    { text },
    // {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    // }
    toast.success("Note created successfully")
  );

// export const deleteNote = (id) => axiosInstance.delete(`/notes/${id}`, {
//     headers:{
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`
//     }

// });
export const deleteNote = async (id) => {
  try {
    await axiosInstance.delete(`/notes/${id}`);
    toast.success("Note deleted successfully");
  } catch (error) {
    console.log("Error in deleting note", error);
    toast.error("Error in deleting note");
  }
};
