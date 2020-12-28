import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import User from '../model/User'

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
                password,
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
            email,
        } = request.body

        console.log(email);
    },
}