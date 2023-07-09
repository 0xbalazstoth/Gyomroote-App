const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = Schema({
    email: {type: String},
    phone: {type: String},
    address: {type: String},
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", ContactSchema);