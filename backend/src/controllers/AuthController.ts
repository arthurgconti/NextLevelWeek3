import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/User'
import Env from '../config/env'
import mailer from '../middleware/mailer'

const secret = Env.secret || ''
const base_url = Env.baseUrl || ''

export default {

    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const userRepository = getRepository(User)
            const user = await userRepository.findOne({ email })

            if (!user)
                return response.status(400).json({ error: "User not found" })

            const validPassword = await bcrypt.compare(password, user.password)

            if (!validPassword) {
                return response.json({ message: 'Senha incorreta' })
            }
            else {
                const token = jwt.sign({ id: user.id }, secret, {
                    expiresIn: 86400
                })

                return response.json({
                    user,
                    token
                })
            }
        }
        catch (err) {
            return response.status(400).json({ error: "User authentication failed" });
        }
    },

    async forgotPass(request: Request, response: Response) {
        const { email } = request.body
        try {

            const userRepository = getRepository(User)
            const user = await userRepository.findOne({ email })

            if (!user)
                return response.status(400).json({ error: "User not found" })

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date();

            now.setHours(now.getMinutes() + 30)

            user.passwordResetToken = token
            user.passwordResetExpires = now
            user.passwordTokenUsed = false

            userRepository.save(user)

            mailer.sendMail({
                to: email,
                from: 'c2a96c9306-4b5639@inbox.mailtrap.io',
                subject: 'Reset password',
                html: `<p>Você esqueceu sua senha? Não tem problema, clique no <a href="${base_url}reset-password?token=${token}&email=${email}">link </a>para recuperar</p>`,
            },
                (err) => {
                    if (err)
                        return response.status(400).send({
                            error: 'Cannot send forgot password email'
                        })

                })

            response.send()
        } catch (err) {
            console.log(err);
            return response.status(400).json({ error: "Error on forget password" })
        }
    },

    async getResetPassword(request: Request, response: Response) {

        const { token, email } = request.query

        try {
            const userRepository = getRepository(User)
            const user = await userRepository.findOne({ where: { passwordResetToken: token, email } })

            if (!user)
                return response.status(400).json({ error: "User not found" })

            const now = new Date()

            if (now > user.passwordResetExpires)
                return response.status(400).json({ error: "Token expired,please generate a new" })

            if (user.passwordTokenUsed)
                return response.status(400).json({ error: "This token was be used, please generate a new" })

            return response.status(200).json(user)

        } catch (err) {
            return response.status(400).json({ error: "Cannot reset password, try again!" })

        }

    },

    async resetPassword(request: Request, response: Response) {
        const { email, password } = request.body

        const userRepository = getRepository(User)
        const user = await userRepository.findOne({ email })

        if (!user)
            return response.status(400).json({ error: "User not found" })

        user.password = password;
        user.passwordTokenUsed = true

        await userRepository.save(user)

        response.status(200).json(user)
    }
}