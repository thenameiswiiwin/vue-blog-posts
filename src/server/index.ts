import * as express from 'express'
import * as cors from 'cors'
import { thisMonth, thisWeek, today } from '../posts'

const app = express()
app.use(cors())

app.get('/posts', (req, res) => {
  res.json([today, thisWeek, thisMonth])
})

app.listen(8000, () => {
  console.log('Server listening on port 8000')
})
