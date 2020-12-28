import Env from '../config/env'

export const host = Env.mailHost || ''
export const port = Env.mailPort || ''
export const user = Env.mailUser || ''
export const pass = Env.mailPass || ''