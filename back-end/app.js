import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./connection.js";
import router from "./router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use("/api/v1", router);

connectDB();

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ error: `Internal Server Error ${err.message}` });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});