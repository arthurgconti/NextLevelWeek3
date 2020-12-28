import dotenv from 'dotenv'

dotenv.config()

const Env = {
    baseUrl: process.env.BASE_URL,
    secret: process.env.JWT_SECRET,
    port: process.env.port,
    mailHost: process.env.MAILER_HOST,
    mailPort: process.env.MAILER_PORT,
    mailUser: process.env.MAILER_USER,
    mailPass: process.env.MAILER_PASS,
}

export default Env