module.exports = (database, Sequelize) => {
	return database.define("User", {
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	})
}
