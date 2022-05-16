const ApiError = require("../error/ApiError");
const { Type } = require("../models/models");
class TypeController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const type = await Type.create({ name })
            res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const type = await Type.findAll()
        res.json(type)
    }
    async getOneType(req, res) {
        try {
            const { id } = req.params
            const type = await Type.findOne({ where: { id } })
            if (!type) {
                return res.json({ message: 'Нет такого типа' })
            }
            res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params
            const type = await Type.destroy({ where: { id } })
            if (type == 0) {
                return res.json({ message: 'Нет такого объекта удаления' })
            }
            res.json({ message: `Объект с id ${id} удален` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new TypeController();