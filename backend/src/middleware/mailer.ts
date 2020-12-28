import nodemailer from 'nodemailer'
import path from 'path'
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/mailerConfig.json')



const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass
    }
})

transport.use('compile', hbs({
    viewEngine:'handlebars',
    viewPath: path.resolve('./src/resource/mail'),
    extName: '.html',
}))



export default transport
