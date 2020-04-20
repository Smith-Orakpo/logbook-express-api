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

const add = (req, res, next) => {
	/**
	 * CREATE A LOG FOR REQUEST USER
	 */
	const { title, desc } = req.body
	Log.create({ title, desc, UserId: req.user.id })
		.then(log => res.send(log))
		.catch(error => next(error))
}

const upd = async (req, res, next) => {
	/**
	 * UPDATE A LOG (NOTE: IF BELONGING TO REQUEST USER)
	 */
	const { title, desc } = req.body
	try {
		const log = await Log.findByPk(req.params.id)
		if (!log) return res.status(404).send("not found")
		// ACCESS-CONTROL
		if (log.UserId !== req.user.id) return res.status(403).send("unauthorized")
		// EDIT LOG CONTENT
		log.title = title || log.title
		log.desc = desc || log.desc
		log.save()
		res.send(log)
	} catch (error) {
		next(error)
	}
}

const rmv = (req, res, next) => {
	/**
	 * DELETE A LOG (NOTE: IF BELONGING TO REQUEST USER)
	 */
	Log.findByPk(req.params.id)
		.then(log => {
			if (!log) return res.status(404).send("not found")
			// ACCESS-CONTROL
			if (log.UserId !== req.user.id)
				return res.status(403).send("unauthorized")
			log.destroy()
			res.send(log)
		})
		.catch(error => next(error))
}

module.exports = {
	all,
	one,
	add,
	upd,
	rmv
}
