import { NextFunction, Request, Response } from 'express'
import Env from '../config/env'
import jwt from 'jsonwebtoken'

interface TOKEN_PAYLOAD {
    id: number,
    iat: number,
    exp: number
}
const secret = Env.secret || ''

async function Authenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader)
        return response.status(201).send({ error: "No token provided" })

        const token = authHeader.replace('Bearer', '').trim()

    try {
        const decode = await jwt.verify(token, secret)
        const { id } = decode as TOKEN_PAYLOAD

        request.userId = id

        return next()
    } catch (err) {
        return response.status(401).send({ error: "Token invalid" })
    }
}

export default Authenticate