import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { thisMonth, thisWeek, today, type Post } from '../utils/posts'
import type { NewUser, User } from '../utils/users'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get('/posts', (req, res) => {
  res.json(allPosts)
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(post)
})

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Server listening on port 8000')
})
