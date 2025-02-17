import express from "express";
import cors from "cors"
import projects from "./routes/projects.js";

const port = "8080";

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Response sent");
});

app.use('/api/projects', projects)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});