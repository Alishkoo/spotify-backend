import { Router } from 'express'
import authRouter from './auth/auth-router'
import MusicRouter from './musicRouter'
import PlaylistRouter from './playlistRouter'
import AuthorRouter from './authorRouter'
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/music', MusicRouter)
globalRouter.use('/playlist', PlaylistRouter)
globalRouter.use('/author', AuthorRouter)
// other routers can be added here

export default globalRouter
