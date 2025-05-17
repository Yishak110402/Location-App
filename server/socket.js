let io;
const usersInGroups = {};

function setupSocket(serverIo) {
  io = serverIo;

  io.on("connection", (socket) => {
    socket.on("sendLocation", (message) => {
      socket.emit("receivedLocation", { message: "We have received" });
    });
    socket.on("joinRoom", ({ room, details }) => {
      socket.join(room);
      if (!usersInGroups[room]) {
        usersInGroups[room] = {};
      }
      usersInGroups[room][details.id] = {
        location: details.location,
        socketId: socket.id
      };      
      io.to(room).emit("updateLocations", { data: usersInGroups[room] });
    });
    socket.on('nudge',({userId, room, senderId})=>{
      if(!usersInGroups[room][userId]){
        socket.to(usersInGroups[room][senderId].socketId).emit({
          message:"User is not connected"
        })
        return
      }
      socket.to(usersInGroups[room][userId]).emit({
        from: senderId,
        to: userId,
        message:"You have been nudged"
      })
    })
    socket.on('disconnect',()=>{
      for(let room in usersInGroups){
        for(let user in usersInGroups[room]){
          if(usersInGroups[room][user].socketId === socket.id){
            delete usersInGroups[room][user]            
            io.to(room).emit("updateLocations", { data: usersInGroups[room] });
            break
          }
        }
      }

    })
  });
}
module.exports = { setupSocket };
