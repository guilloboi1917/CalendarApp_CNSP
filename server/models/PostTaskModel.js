import mongoose from "mongoose";

const PostTaskSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  complete: Boolean, // Not sure if this is necessary
  color: {type: String, default: '#ef4040'}, // https://colorhunt.co/palette/711db0c21292ef4040ffa732
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