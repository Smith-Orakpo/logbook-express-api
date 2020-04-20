const { Log } = require("../database")

const all = (req, res, next) => {
	/**
	 * RETURN LOGS BELONGING TO REQUEST USER
	 */
	Log.findAll({ where: { UserId: req.user.id } })
		.then(logs => res.send(logs))
		.catch(error => next(error))
}

const one = (req, res, next) => {}

const add = (req, res, next) => {}

const upd = (req, res, next) => {}

const rmv = (req, res, next) => {}

module.exports = {
	all,
	one,
	add,
	upd,
	rmv
}
