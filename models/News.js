const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const NewsSchema = new Schema({
    title: {
        // title:"",
        type: String,
        required: true
    },
    link: {
        // link:"",
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;