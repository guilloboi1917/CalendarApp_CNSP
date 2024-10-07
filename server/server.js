import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import PostTaskRoutes from "./routes/PostTaskRoute.js";
import UserRoute from "./routes/UserRoute.js";

console.log(dotenv.config());

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", PostTaskRoutes);
app.use("/users", UserRoute);

app.get("/", (req, res) => {
  res.send("hello to crud calendar api")
})

const CONNECTION_URL = "mongodb://localhost:27017/test";//process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

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

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {

    //clear database before use
    // await resetDatabase();

    // start
    app.listen(PORT, () =>
      console.log(`Server Running on Port: ${PORT}`)
    )
  })
  .catch((error) => console.log(`${error} did not connect`));
