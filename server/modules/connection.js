const mongoose = require("mongoose")
const db = mongoose.connect(
    "mongodb+srv://kostask:zeblomadison@cluster0.0pprqos.mongodb.net/comments?retryWrites=true&w=majority"
)
module.exports = db