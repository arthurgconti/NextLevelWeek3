import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import User from '../model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Env from '../config/env'

const secret = Env.secret || ''

export default {

    async create(request: Request, response: Response) {

        const {
            name,
            email,
            password
        } = request.body

        const userRepository = getRepository(User)

        const existUser = await userRepository.findOne({ where: { email } })

        if (!existUser) {

            const data = {
                name,
                email,
                password
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })

            await schema.validate(data, {
                abortEarly: false
            })
            const user = userRepository.create(data)
            await userRepository.save(user)

            return response.status(201).json(user)
        }
        else
            return response.json({ message: "usuário já existe no sistema" })

    },

    async update(request: Request, response: Response) {
        const {

            name,
            email,
            password
        } = request.body

    },

    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const userRepository = getRepository(User)
            const user = await userRepository.findOne({ email })

            if (!user)
                return response.status(400).json({ error: "User not found" });

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
    }
}