require("dotenv").config()

const express = require("express")

const middleware = require("./middleware")

const app = express()

middleware(app)

app.get("/", (req, res) => res.send("logbook"))

app.listen(process.env.PORT)
