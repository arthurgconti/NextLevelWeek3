import dotenv from 'dotenv'

dotenv.config()

const Env = {
    //Server
    baseUrl: process.env.BASE_URL,
    port: process.env.port,
    //mailer
    mailHost: process.env.MAILER_HOST,
    mailPort: process.env.MAILER_PORT,
    mailUser: process.env.MAILER_USER,
    mailPass: process.env.MAILER_PASS,
    //Token's
    secret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    tokenLife: process.env.TOKEN_LIFE,
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
}

export default Env