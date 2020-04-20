const path = require("path")
const Sequelize = require("sequelize")
const { LogModel, UserModel } = require("../models")

const database = new Sequelize({
	dialect: "sqlite",
	storage: path.resolve(__dirname, "..", "..", "data.sqlite")
})

// models
const Log = LogModel(database, Sequelize)
const User = UserModel(database, Sequelize)

// associations
Log.belongsTo(User)
User.hasMany(Log)

// connection
database.sync({ force: false }).catch(error => console.log(error.message))

module.exports = {
	Log,
	User
}
