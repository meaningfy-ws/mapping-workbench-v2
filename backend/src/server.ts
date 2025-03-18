import app from "./app.ts";

const PORT = process.env.MW_BACKEND_PORT;

app.listen(PORT, () => {
    console.log(`MWB2 Backend is listening on port ${PORT}`);
});

