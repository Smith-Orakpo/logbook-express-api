const validator = require("validator")

module.exports = (req, res, next) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).send("email and password required")

	if (!validator.isEmail(email)) return res.status(400).send("invalid email")

	if (String(password).length < 8)
		return res.status(400).send("password must be at least 8 characters")

	next()
}
