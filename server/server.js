import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";

// Defense
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import easyWaf from "easy-waf";
import mongoSanitize from "express-mongo-sanitize";

import PostTaskRoutes from "./routes/PostTaskRoute.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

// const privateKey = fs.readFileSync('sslcert/server.key', 'utf-8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf-8');
// const credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello to crud calendar api")
})

// Rate limiting with express-rate-limit (basic usage for common paths)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
});

// Rate limiting
app.use(limiter);

// Use Helmet to secure HTTP headers
app.use(helmet());

// mongo input sanitizing
app.use(mongoSanitize());

// Basic WAF with easy-waf
app.use(
  easyWaf({
      allowedHTTPMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
      modules: {
          directoryTraversal: {
              enabled: true,
              excludePaths: /^\/exclude$/i,
          },
          xss : {
            enabled: true
          },
          noSqlInjection: {
            enabled: true
          }
      },
  }),
);

// Specify routes after middleware
app.use("/tasks", PostTaskRoutes);
app.use("/users", UserRoute);

var httpServer = http.createServer(app);

const CONNECTION_URL = process.env.MONGO_URI;

const PORT = process.env.PORT;

// console.log(`connecting to: ${CONNECTION_URL}`)

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

    httpServer.listen(PORT, () =>
      console.log(`HTTP Server Running on Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
