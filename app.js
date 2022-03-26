const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/db");
const studentRouter = require("./routes/studentRoutes");

app.use(express.json());
app.use("/api/v1", studentRouter);

const server = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to database...");
        const listener = app.listen(process.env.PORT || 3000, () => {
            console.log(
                "Server is listening on port: " + listener.address().port
            );
        });
    } catch (error) {
        console.log(error);
    }
};
server();
