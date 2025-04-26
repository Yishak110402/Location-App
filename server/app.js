const express = require("express");
const {Server} = require("socket.io")
const cors = require("cors");
const http = require("http")
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const groupRouter = require("./routes/groupRoutes")
const invitationRouter = require("./routes/invitationRoutes")
const app = express();

const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin: "*",
  }
})

io.on('connection',(socket)=>{
  console.log("User connected "+ socket.id);  
})

app.use(cors());
app.use(express.json())
app.use("/user", userRouter);
app.use("/group", groupRouter)
app.use("/invitation", invitationRouter)

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
app.all("/*", (req, res)=>{
  return res.json({
    status:"fail",
    message:`Can't ${req.method} to ${req.originalUrl}`
  })
})
server.listen(6969, () => {
  console.log("Listening on Port 6969");
});
