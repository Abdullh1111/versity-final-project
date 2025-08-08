import express, { Request, Response } from 'express'
import cors from 'cors'
import config from './config'
import { globalErrorHandler } from './hooks/globalErrorHandler'
import userRouter from './modules/user/user.router'
import postsRoutes from './modules/posts/post.router'

const app = express()

app.use(express.json())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true}))
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! from backend')
})

app.use("/auth",userRouter)
app.use("/posts", postsRoutes);

app.use(globalErrorHandler)


export default app
