import "./config/env.js";

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import app from "./app.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();