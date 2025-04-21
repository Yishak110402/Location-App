const mongoose = require("mongoose")

const invitationSchema = new mongoose.Schema({
    invitationFor: String,
    invitedToGroup: String
})