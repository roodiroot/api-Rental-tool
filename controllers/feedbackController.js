const ApiError = require("../error/ApiError");
const { Feedback } = require("../models/models");

class FeedbackController {
    async create(req, res, next) {
        try {
            const { name, rate, feedback } = req.body
            const feed = await Feedback.create({ name, rate, feedback })
            res.json(feed)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            let { check, page, limit } = req.query
            page = page || 1
            limit = limit || 3
            let offset = page * limit - limit
            const type = await Feedback.findAndCountAll({ where: { check }, limit, offset })
            res.json(type)
        } catch(e) { 
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params
            const type = await Feedback.destroy({ where: { id } })
            if (type == 0) {
                return res.json({ message: 'Нет такого объекта удаления' })
            }
            res.json({ message: `Объект с id ${id} удален` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async update(req, res, next) {
        try {
            const { id, check } = req.body
            const feed = await Feedback.update({ check }, { where: { id } })
            res.json(feed)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}
module.exports = new FeedbackController();