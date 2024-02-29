const catchError = require('../utils/catchError');
const User = require('../model/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll()
    return res.json(users)
});

const create = catchError(async(req, res) => {
    const {first_name, last_name, Aportes} = req.body
    const users = await User.create({
        first_name,
        last_name,
        Aportes,
    })
    return res.status(201).json(users)
})

const getOne = catchError(async(req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    return res.json(user)
})

const remove = catchError(async(req, res) => {
    const { id } = req.params
    await User.destroy({where: {id: id}})
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const { id } = req.params
    const {first_name, last_name, Aportes} = req.body
    const user = await User.update({
        first_name,
        last_name,
        Aportes
    }, {where: {id: id}, returning: true})
    return res.json(user[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}