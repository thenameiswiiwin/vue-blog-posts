import type { Request, Response } from 'express'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as jsonwebtoken from 'jsonwebtoken'
import { thisMonth, thisWeek, today, type Post } from '../utils/posts'
import type { NewUser, User } from '../utils/users'

const app = express()
app.use(cors())
app.use(cookieParser())
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

const TOKEN = 'secret-token'
const COOKIE = 'cookie-jwt'

function authenicate(id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, TOKEN, {
    issuer: 'thenameiswiiwin',
    expiresIn: '30 days'
  })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  authenicate(user.id, req, res)
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Server listening on port 8000')
})
