const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const auth = req.headers["authorization"]
	if (!auth) return res.status(403).send("log in")

	const token = auth.split(" ")[1]
	jwt.verify(token, process.env.SECRET, (error, data) => {
		if (error) return res.status(403).send(error.message)
		req.user = data.user
		next()
	})
}
