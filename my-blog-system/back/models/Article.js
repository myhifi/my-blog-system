const mongoose = require("mongoose");

// The Schema defines the shape of your data
const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, default: "Anonymous"},
    createdAt:{ type: Date, default: Date.now}
});

// The Model is what you use in your routes to talk to the database
module.exports = mongoose.model("Article", articleSchema);