import mongoose from "mongoose";

const PostTaskSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  complete: Boolean,
  date: {
    day: { type: Number },
    month: { type: Number },
    year: { type: Number }, 
    startTime: {type: Number}, //HHmm
    endTime: {type: Number} //HHmm
  },
  sharedWith: [String] // list of other user's emails
})

const PostTask = mongoose.model("PostTask", PostTaskSchema);

export default PostTask;