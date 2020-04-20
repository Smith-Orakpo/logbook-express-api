const { Log } = require("../database")

const all = (req, res, next) => {
	/**
	 * RETURN LOGS BELONGING TO REQUEST USER
	 */
	Log.findAll({ where: { UserId: req.user.id } })
		.then(logs => res.send(logs))
		.catch(error => next(error))
}

const one = (req, res, next) => {
	/**
	 * RETURN A LOG (NOTE: IF BELONGING TO REQUEST USER)
	 */
	Log.findByPk(req.params.id)
		.then(log => {
			if (!log) return res.status(404).send("not found")
			// ACCESS-CONTROL
			if (log.UserId !== req.user.id)
				return res.status(403).send("unauthorized")
			res.send(log)
		})
		.catch(error => next(error))
}

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
