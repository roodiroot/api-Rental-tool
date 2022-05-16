const uuid = require('uuid')
const path = require('path')
const { Tool, ProductInfo } = require('../models/models')
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, rate, video, description, typeId, info } = req.body
            const { img1, img2, img3 } = req.files
            let fileName2 = ''
            let fileName3 = ''
            let fileName1 = uuid.v4() + '.jpg'
            img1.mv(path.resolve(__dirname, '../', 'static', fileName1))
            if (img2) {
                fileName2 = uuid.v4() + '.jpg'
                img2.mv(path.resolve(__dirname, '../', 'static', fileName2))
            }
            if (img3) {
                fileName3 = uuid.v4() + '.jpg'
                img3.mv(path.resolve(__dirname, '../', 'static', fileName3))
            }
            const product = await Tool.create({ name, price, rate, video, img1: fileName1, img2: fileName2, img3: fileName3, description, typeId })
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({ title: i.title, description: i.description, toolId: product.id })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            let { typeId, page, limit } = req.query
            page = page || 1
            limit = limit || 8
            let offset = page * limit - limit
            let products
            if (!typeId) {
                products = await Tool.findAndCountAll({ limit, offset })
            }
            if (typeId) {
                products = await Tool.findAndCountAll({ where: { typeId }, limit, offset })
            }
            res.json(products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAllSearch(req, res) {
        let { text, limit } = req.query
        limit = limit || 16
        const products = await Tool.findAndCountAll({ where: { name: { [Op.iLike]: '%' + text + '%' } }, limit })
        res.json(products)

    }
    async getOne(req, res) {
        const { id } = req.params
        const product = await Tool.findOne({
            where: { id },
            include: [{ model: ProductInfo, as: 'info' }]
        })
        res.json(product)
    }
    async updadeTool(req, res) {
        const { id, price, rate, description, video } = req.body
        const newProduct = await Tool.update({ price, rate, description, video }, { where: { id } })
        res.json(newProduct)
    }
    async deleteTool(req, res) {
        try {
            const { id } = req.params
            const product = await Tool.destroy({ where: { id } })
            if (product == 0) {
                return res.json({ message: 'Нет такого объекта удаления' })
            }
            res.json({ message: `Объект с id ${id} удален` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getInfo(req, res) {
        let { toolId } = req.query
        const limit = 2
        const infos = await ProductInfo.findAll({ where: { toolId }, limit })
        res.json(infos)
    }
}
module.exports = new ProductController();