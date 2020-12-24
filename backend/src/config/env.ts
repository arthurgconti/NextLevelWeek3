import dotenv from 'dotenv'

dotenv.config()

const Env = {
    secret: process.env.JWT_SECRET,
    port: process.env.port
}

export default Env