module.exports = (database, Sequelize) => {
	return database.define("Log", {
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		desc: {
			type: Sequelize.STRING,
			allowNull: false
		}
	})
}
