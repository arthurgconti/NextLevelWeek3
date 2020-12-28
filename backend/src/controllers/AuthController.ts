import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/User'
import Env from '../config/env'
// const mailer = require('../middleware/mailer')
import mailer from '../middleware/mailer'

const secret = Env.secret || ''

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
            user.passwordRestExpires = now

            userRepository.save(user)


            mailer.sendMail({
                to: email,
                from: 'arthurgallotticonti@gmail.com',
                subject: 'Reset password',
                template: 'auth/forgot_passowrd',
                context: { token },
            }, (err: Error) => {
                if (err) {
                    return response.status(400).send({ error: 'Cannot send forgot password email'})
                }
            })

            response.send()

        } catch (err) {
            console.log(err);
            return response.status(400).json({ error: "Error on forget password" })
        }
    }

}