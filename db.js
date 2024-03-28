require("dotenv").config()
const { Sequelize } = require("sequelize")

const fs = require("fs")
const path = require("path")
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  },
)
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, "/src/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/src/models", file)))
  })

modelDefiners.forEach((model) => model(sequelize))

let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

const { User } = sequelize.models

const ver = async () => {
  await sequelize.sync()
}
ver()

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Coca.belongsToMany(User, { through: "DriverTeam", timestamps: false })
// User.belongsToMany(Coca, { through: "DriverTeam", timestamps: false })
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}

