let io;
const usersInGroups = {};

function setupSocket(serverIo) {
  io = serverIo;

  io.on("connection", (socket) => {
    console.log("User Connected: " + socket.id);
    socket.on("sendLocation", (message) => {
      console.log(message);
      socket.emit("receivedLocation", { message: "We have received" });
    });
    socket.on("joinRoom", ({ room, details }) => {
      socket.join(room);
      console.log(details);
      if (!usersInGroups[room]) {
        usersInGroups[room] = {};
      }
      usersInGroups[room][details.id] = { status: "Connected" };
      socket.emit("joined", { data: usersInGroups });
    });
  });
}

module.exports = { setupSocket };
