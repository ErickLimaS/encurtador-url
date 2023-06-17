const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const shortenerUrlRoute = require("./routes/shortenerUrlRoute.js");
const userRoute = require("./routes/userRoute.js");

dotenv.config();

const PORT = process.env.PORT || 9000;

const app = express();

connect(process.env.DB_URI).then(() => {
  console.log("DB Online!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", shortenerUrlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Currently running on port: ${PORT}`);
});
