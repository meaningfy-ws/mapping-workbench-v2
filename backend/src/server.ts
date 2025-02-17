import express from "express";
import cors from "cors"
import products from "./routes/products.js";

const port = "8080";

const app = express();

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Response sent");
});

app.use('/api/products', products)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});