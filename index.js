import express from "express";
import libraryRoutes from "./routes/libraryRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Library Management API is running successfully!"
    });
});


app.use("/api/library", libraryRoutes);

app.use((req, res) => {
    return res.status(404).json({
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});