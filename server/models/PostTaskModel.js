import mongoose from "mongoose";

const PostTaskSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  complete: Boolean,
  date: {
    day: { type: Number },
    month: { type: Number },
    year: { type: Number }
    // , 
    // startTime: {type: String}, //HH:mm
    // endTime: {type: String} //HH:mm
  },
  sharedWith: [String] // list of other user's emails
})

const PostTask = mongoose.model("PostTask", PostTaskSchema);

export default PostTask;