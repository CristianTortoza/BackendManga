const express = require("express")
const debug = require("debug")("app")
require("./db.js")
const morgan = require("morgan")
const cors = require("cors")

const PORT = 3000
const server = express()

server.use(morgan("dev"))
server.use(express.json())
server.use(cors())

// server.use(router)

server.listen(PORT, () => {
  debug(`server on ${PORT}`)
})

module.exports = server

