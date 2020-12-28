import nodemailer from 'nodemailer'
import { host, port, user, pass } from '../consts/mailerConfig'

const mailPort = parseInt(port)

const transport = nodemailer.createTransport({
    host,
    port: mailPort,
    auth: {
        user,
        pass
    }
})

export default transport
