const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("test-back-db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
})

const User = sequelize.define("Users", {
  firstname: DataTypes.STRING,
  secondname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  sex: DataTypes.STRING,
  photo: DataTypes.STRING,
})

;(async () => {
  sequelize.sync().then(() => console.log("init db"))
})()

module.exports = { User }
