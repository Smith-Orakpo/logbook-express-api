require("dotenv").config()

const express = require("express")

const router = require("./router")
const middleware = require("./middleware")

const app = express()

middleware(app)

app.use("/", router)

app.listen(process.env.PORT)
