import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";

import PostTaskRoutes from "./routes/PostTaskRoute.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

const privateKey = fs.readFileSync('sslcert/server.key', 'utf-8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf-8');
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", PostTaskRoutes);
app.use("/users", UserRoute);

app.get("/", (req, res) => {
  res.send("hello to crud calendar api")
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

const CONNECTION_URL = process.env.MONGO_URI;

const PORT = process.env.PORT || 3001; // Apparently we need port 80/443

console.log(`connecting to: ${CONNECTION_URL}`)

// Function to drop the database
async function resetDatabase() {
  try {
    // Drop the database
    await mongoose.connection.dropDatabase();
    console.log("Database has been cleared.");
  } catch (err) {
    console.error("Failed to reset the database:", err);
  }
}

console.log("attempting to connect")

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {

    //clear database before use
    // await resetDatabase();

    // start
    // app.listen(PORT, () =>
    //   console.log(`Server Running on Port: ${PORT}`)
    // )
    httpServer.listen(80, () =>
      console.log(`HTTP Server Running on Port: 80`));

    httpsServer.listen(443, () => {
      console.log(`HTTPS Server Running on Port: 443`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
