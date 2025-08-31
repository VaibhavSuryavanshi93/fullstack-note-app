import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import { useAuthStore } from "./store/userAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import { getNotes, createNote, deleteNote } from "./store/userNotes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const { authUser, checkAuth, ischeckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      fetchNotes();
    }
  }, [authUser]);

  const fetchNotes = async () => {
    const { data } = await getNotes();
    setNotes(data);
  };

  const handleAddNote = async (text) => {
    await createNote(text);
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  if (ischeckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      {!["/login", "/signup"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <HomePage
                notes={notes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          disabled={<Navbar />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          disabled={<Navbar />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
