import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import { createBucket, listBuckets, deleteBucket, uploadFile, downloadFile, processTextFile, updateTextFile } from './utils/s3-middleware'
import cors from 'cors'

const PORT = process.env.PORT || 5000
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/api/', globalRouter)

const server = createServer(app)




server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
