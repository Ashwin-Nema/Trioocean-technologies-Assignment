import express from 'express'
import client from '../database'

const ListRouter = express.Router()

// Query for getting all data with offset and limit 
ListRouter.get("/", async (req, res) => {

    try {
        const { limit, offset } = req.query
        const queryForAddingNewData = {
            text: `SELECT * FROM todolist LIMIT $1 OFFSET $2`,
            values: [limit, offset]
        }

        const queryForGettingCount = {
            text: `SELECT COUNT(*) from todolist`,
        }

        const data = await client.query(queryForAddingNewData)
        const count = await client.query(queryForGettingCount)
        res.json({data:data.rows, count:count.rows[0].count, code:200})
    } catch {
        res.status(404).send("Sorry something went wrong")
    }
})


// Query for getting data for a single id
ListRouter.get("/:id", async (req, res) => {

    try {
        const { id } = req.params
        const queryForGettingDatForSingleID = {
            text: `SELECT * FROM todolist WHERE ID=$1`,
            values: [id]
        }
        const data = await client.query(queryForGettingDatForSingleID)
        res.json({data:data.rows,  code:200})
    } catch {
        res.status(404).send("Sorry something went wrong")
    }
})


// Query for adding data
ListRouter.post("/", async (req, res) => {
    try {
        const { title, description, due_date } = req.body
        
        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()

        if (trimmedDescription == "" || trimmedTitle == "") {
            return res.json({message:"Data provided is not correct", code:422})
        }
        const queryForAddingNewData = {
            text: `INSERT INTO todolist(title, description, due_date) VALUES($1, $2, $3)`,
            values: [trimmedTitle, trimmedDescription, due_date]
        }

        await client.query(queryForAddingNewData)
        res.json({code:200, message:"data added successfully"})

    } catch(error) {
        res.status(404).send("Sorry something went wrong")
    }
})


// Query for updating data for an id
ListRouter.put("/:id", async(req, res) => {
    try {
        const {id} = req.params
        const { title, description, due_date } = req.body
        
        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()

        if (trimmedDescription == "" || trimmedTitle == "") {
            return res.json({message:"Data provided is not correct", code:422})
        }
        const queryForUpdatingData = {
            text: `UPDATE todolist SET title=$1, description=$2, due_date=$3 WHERE ID=$4`,
            values: [trimmedTitle, trimmedDescription, due_date, id]
        }

        await client.query(queryForUpdatingData)
        res.json({code:200, message:"Data updated successfully"})

    } catch {
        res.status(404).send("Sorry something went wrong")
    }
})

// Query for deleting data associated with an ID
ListRouter.delete("/:id", async(req, res) => {
    try {
        const {id} = req.params
        const queryForUpdatingData = {
            text: `DELETE FROM todolist WHERE ID=$1`,
            values: [ id]
        } 

        await client.query(queryForUpdatingData)
        res.json({code:200, message:"Data deleted successfully"})
    } catch {
        res.status(404).send("Sorry something went wrong")
    }
})

export default ListRouter