const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultSchema = new Schema({
    body: String,
    rating: Number, //lets eventually add upvotes
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Consult", consultSchema);