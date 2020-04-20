const morgan = require("morgan")
const parser = require("body-parser")

module.exports = app => {
	app.set("json spaces", 2)
	app.use(morgan("dev"))
	app.use(parser.json())
	app.use(parser.urlencoded({ extended: false }))
}
