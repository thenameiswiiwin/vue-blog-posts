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

app.put<{}, {}, Post>('/posts', (req: Request, res: Response) => {
  const index = allPosts.findIndex((post) => post.id === req.body.id)
  if (index === -1) {
    throw Error(`Post with id ${req.body.id} not found`)
  }
  const existingPost = allPosts[index]
  allPosts[index] = { ...existingPost, ...req.body }
  return res.json(allPosts[index])
})

app.post<{}, {}, Post>('/posts', (req: Request, res: Response) => {
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

app.get('/current-user', (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, TOKEN) as { id: string }
    res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.post('/logout', (req: Request, res: Response) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
})

app.post<{}, {}, NewUser>('/login', (req: Request, res: Response) => {
  const targetUser = allUsers.find(
    (user) => user.username === req.body.username
  )

  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenicate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.post<{}, {}, NewUser>('/users', (req: Request, res: Response) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  authenicate(user.id, req, res)
  const { ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Server listening on port 8000')
})
