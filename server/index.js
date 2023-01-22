import express from "express"
import cors from 'cors'
import mongoose, { Schema } from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

const PostSchema = new Schema({
  title: String,
  description: String,
})
// comments: [{ body: String, date: Date }],
// date: { type: Date, default: Date.now },
const Post = mongoose.model('Post', PostSchema)

export default Post

app.use(cors())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, (err) => {
  if (err) return console.log(err)
  console.log('DB Connected')

  app.get('/posts', async (req, res) => {
    const posts = await Post.find({})

    console.log(posts)

    res.status(200).json(posts)
  })

  app.post('/create', async (req, res) => {
    const createdPost = await Post({ title: "title", description: "description" })

    res.status(201).json(createdPost)
  })

  app.put('/update', async (req, res) => {
    const updatedPost = await Post.updateOne({ _id: "63cc96e57107ced6018fec60" }, { title: "new", description: "new" })

    console.log(updatedPost)

    res.status(201).json(updatedPost)
  })

  app.delete('/delete', async (req, res) => {
    console.log('delete')
    await Post.deleteOne({ title: "something" })

    res.status(200).json({ message: "post deleted" })
  })
  app.listen(PORT, () => console.log('Server Started On: ' + PORT))

})
