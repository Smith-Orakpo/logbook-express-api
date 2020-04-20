const router = require("express").Router()
const { logs, users } = require("../controllers")
const { auth, data } = require("../utils")

router.get("/", (req, res) => res.send("logbook"))

router.route("/logs").get(auth, logs.all).post(auth, logs.add)

router
	.route("/logs/:id")
	.get(auth, logs.one)
	.put(auth, logs.upd)
	.delete(auth, logs.rmv)

router.post("/users/login", data, users.login)

router.post("/users/signup", data, users.signup)

router.use((req, res) => res.status(400).send("not found"))

router.use((error, req, res, next) => {
	console.log(error.message)
	res.status(500).send("")
})

module.exports = router
