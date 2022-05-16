const sequelize = require('../db')
const { DataTypes } = require('sequelize')
 
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING}
})
const Tool = sequelize.define('tool', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 0},
    rate: { type: DataTypes.FLOAT, defaultValue: 0 },
    img1: { type: DataTypes.STRING, allowNull: false },
    img2: { type: DataTypes.STRING},
    img3: { type: DataTypes.STRING},
    video: {type: DataTypes.STRING},
    description: { type: DataTypes.STRING }
})
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true},
})
const Rate = sequelize.define('rate', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rate: { type: DataTypes.INTEGER, allowNull: false}
})
const ProductInfo = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.STRING, allowNull: false},
})
const Feedback = sequelize.define('feedback', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING, defaultValue: "Неизвестный гость"},
    rate: {type: DataTypes.FLOAT, defaultValue: 0},
    feedback: {type: DataTypes.STRING, allowNull: false},
    check: {type: DataTypes.BOOLEAN, defaultValue: false}
})


Type.hasMany(Tool)
Tool.belongsTo(Type)

Tool.hasMany(Rate)
Rate.belongsTo(Tool)

Tool.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Tool)

module.exports = {
    User, Type,  Rate, ProductInfo, Tool, Feedback
}