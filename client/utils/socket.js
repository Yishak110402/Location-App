const { io } = require("socket.io-client");

// export const socket = io.connect("http://192.168.0.110:6969")
export const socket = io.connect("https://locationapp.keabafrica.com")
