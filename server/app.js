const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(express.json())
app.use("/user", userRouter);

mongoose.connect(
  "mongodb://127.0.0.1:27017/locationapp",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB succesfully");
  }
);

app.all("/", (req, res) => {
  return res.json({
    status: "success",
    message: "Welcome to the Location App API",
  });
});
app.listen(6969, () => {
  console.log("Listening on Port 6969");
});
