import cors from "cors";
import express from "express";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("files"));

export { app };
