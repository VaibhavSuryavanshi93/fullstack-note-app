import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js"; 
import noteRoutes from "./routes/noteRoute.js"; 
import { connectDB } from "./lib/db.js";
import path from "path";

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json({ limit: "7mb" })); // Parse JSON bodies
app.use(cookieParser()); // Parse Cookies from Client to check cookie is correct or not .
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
};
app.listen(PORT, () => {
  console.log(`server is running on http://localhost${PORT}`);
  connectDB();
});
