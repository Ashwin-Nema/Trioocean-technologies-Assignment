import client from './database'
import express from 'express'
import ListRouter from './routes/todolist'
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin:  process.env.PORT || 'http://localhost:3000' 
    })
)

// Query for creating our table for storing to do list data

// const QueryForMakingToDoList = {
//     text: `CREATE TABLE TODOLIST(
//         id             SERIAL          PRIMARY KEY,
//         Title          VARCHAR(250)    NOT NULL,
//         Description    TEXT            NOT NULL,
//         due_date       DATE  
//      );`
// }

// client.query(QueryForMakingToDoList, (err: any) => {
//     if (err) {
//         console.log(err.stack)
//         return
//     }

//     console.log("To do list table created successfully")
// })

// ListRouter has all the CRUD Operations for the list
app.use("/list", ListRouter)
app.listen(4000, () => {
    console.log("Server started")
    client.connect()
})