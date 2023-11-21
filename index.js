import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'


import "dotenv/config"

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("diet-fuel-app")
const menu = db.collection("menu")
const userDb = db.collection("users")

// GET ALL MENUS

app.get("/", async (req, res) => {
    const allMenu = await menu.find().toArray()
    console.log("all Menus => " ,allMenu)
    res.send(allMenu)
});

// CREATE MENU

app.post("/", async (req, res) => {
    const newMenu = { title: req.body.title, description: req.body.description}
    await menu.insertOne(newMenu)

    const allMenu = await menu.find().toArray()
    res.send(allMenu)
});

app.post("/login", async (req, res) => {
    console.log(reg.body)
    const userFound = userDb.findOne({ email: req.body.email})

    res.send(userFound)
})

// delete one menu
app.delete("/", async (req, res) =>{
    req.query
    console.log(req.query)
    //console.log(req.params)
    
    const _id = new ObjectId(req.params._id)
    const itemDeleted = await menu.findOneAndDelete({_id: _id})
    res.send(itemDeleted)

})

const port =parseInt(process.env.PORT) || 8080
app.listen(port, () => console.log("Api Listening on port 8080 "))


