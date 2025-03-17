import app from "./app.ts";

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.MW_BACKEND_PORT;

app.listen(PORT, () => {
    console.log(`MWB2 Backend is listening on port ${PORT}`);
});

