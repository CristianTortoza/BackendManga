const { DataTypes } = require("sequelize")

const img =
  "https://librolibertate.files.wordpress.com/2021/04/portada-manga.jpg"

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: img,
      },
      favorites: {
        type: DataTypes.ARRAY,
        allowNull: true,
      },
      google: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verify_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true },
  )
}
