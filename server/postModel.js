import mongoose from 'mongoose'
const { Schema } = mongoose

const PostSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  description: String,
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
})
const Post = mongoose.model('Post', PostSchema)

export default Post