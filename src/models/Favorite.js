const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      MangaId: {
        type: DataTypes.STRING,
      },
      Chapter: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    },
    { timestamps: false,freezeTableName: true },
  )
}