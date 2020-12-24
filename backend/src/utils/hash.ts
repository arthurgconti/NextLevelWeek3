import { string } from "yup"

const bcrypt = require('bcrypt')
const saltRounds = 12

export async function generateHash(password: string) {

    console.log(password)
    password = await bcrypt.hash(password, saltRounds)
    console.log(password)
    return password
}

