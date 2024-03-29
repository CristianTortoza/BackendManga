const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const PORT = process.env.PORT || 4040
const app = express()

// DB
const { db } = require("./src/config/database")
// Test DB
db.authenticate()
  .then(() => console.log("database conect on"))
  .catch((e) => console.log("Error DB" + e))

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.use("/user", require("./src/routes/user"))

app.listen(PORT, () => {
  console.log(`app on ${PORT}`)
})

module.exports = app

