import {config} from 'dotenv'
import { Client } from 'pg'

config()

const {POSTGRESS_USER, POSTGRESS_HOST, POSTGRESS_DATABASE, POSTGRESS_PASSWORD, POSTGRESS_PORT} = process.env

const client = new Client({
    user: POSTGRESS_USER,
    host: POSTGRESS_HOST,
    database: POSTGRESS_DATABASE,
    password: POSTGRESS_PASSWORD,
    port: Number(POSTGRESS_PORT)
})

export default client