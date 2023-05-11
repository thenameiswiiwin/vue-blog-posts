import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { thisMonth, thisWeek, today, type Post } from '../posts'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]

app.get('/posts', (req, res) => {
  res.json([today, thisWeek, thisMonth])
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(post)
})

app.listen(8000, () => {
  console.log('Server listening on port 8000')
})
