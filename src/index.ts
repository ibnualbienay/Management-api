import express from "express";
import taskRoute from "./routes/task-route";

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/v1/tasks", taskRoute);

app.get("/", (req, res) => {
    res.send("Hello express + TypeScript! (Task API)");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});