import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import birthdayRoutes from "./routes/birthday.routes.js";
import contributionRoutes from "./routes/contribution.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// TEMP auth middleware user
app.use((req, res, next) => {
  req.user = { id: "PUT_REAL_USER_ID_HERE" }; // replace later
  next();
});

app.use("/api/birthday", birthdayRoutes);
app.use("/api/contribution", contributionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch(console.error);
