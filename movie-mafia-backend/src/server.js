import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import app from "./app.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

connectDb();
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})
