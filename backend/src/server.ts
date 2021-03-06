import express from 'express'
import 'express-async-errors'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import Env from './config/env'
import '../src/database/connection'
import routes from './routes'
import errorHandler from './errors/handler'


const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(Env.port,()=> console.log(`O pai ta on 🔥 ${Env.port} 🔥`))