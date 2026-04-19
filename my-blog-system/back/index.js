// 1. Import the tools we need
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 2. Activate our environment variables
dotenv.config();
connectDB();

// 3. Create the server (app is just the name everyone uses)
const app = express();

// 4. Middleware — teach the server to understand JSON & allow frontend to talk to it
app.use(express.json());
app.use(cors());

app.use("/api/articles", require("./routes/articles"));

// 5. A test route — just to confirm the server works
app.get("/", (req, res)=>{
    res.send("Server is alive!");
});

// 6. Choose a port and start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})