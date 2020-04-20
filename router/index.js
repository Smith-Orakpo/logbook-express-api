const router = require("express").Router()
const { logs, users } = require("../controllers")

router.get("/", (req, res) => res.send("logbook"))

router.route("/logs").get(logs.all).post(logs.add)

router.route("/logs/:id").get(logs.one).put(logs.upd).delete(logs.rmv)

router.post("/users/login", users.login)

router.post("/users/signup", users.signup)

router.use((req, res) => res.status(400).send("not found"))

router.use((error, req, res, next) => {
	console.log(error.message)
	res.status(500).send("")
})

module.exports = router
