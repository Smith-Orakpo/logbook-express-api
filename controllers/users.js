const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../database")

const login = async (req, res, next) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ where: { email } })
		if (!user) return res.status(400).send("invalid credentials")

		const match = await bcrypt.compare(password, user.password)
		if (!match) return res.status(400).send("invalid credentials")

		const token = await jwt.sign({ user }, process.env.SECRET, {
			expiresIn: "1h"
		})
		res.send(token)
	} catch (error) {
		next(error)
	}
}

const signup = (req, res, next) => {}

module.exports = {
	login,
	signup
}
