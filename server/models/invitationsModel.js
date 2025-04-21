const mongoose = require("mongoose")

const invitationSchema = new mongoose.Schema({
    invitedUser: String,
    invitedToGroup: String
})

const Invitation = mongoose.model("Invitation", invitationSchema)

module.exports = Invitation