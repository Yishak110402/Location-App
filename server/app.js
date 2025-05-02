const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const groupRouter = require("./routes/groupRoutes");
const invitationRouter = require("./routes/invitationRoutes");
const { setupSocket } = require("./socket");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/group", groupRouter);
app.use("/invitation", invitationRouter);

const onlineURL =  "mongodb+srv://yishak:rfTtsGRqkPr5ILhL@write-wave.3yjawuk.mongodb.net/locationapp?retryWrites=true&w=majority&appName=write-wave"
const localURL = "mongodb://127.0.0.1:27017/locationapp"
mongoose.connect(
  onlineURL,
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
app.all("/*", (req, res) => {
  return res.json({
    status: "fail",
    message: `Can't ${req.method} to ${req.originalUrl}`,
  });
});
server.listen(1212, () => {
  console.log("Listening on Port 1212");
});
