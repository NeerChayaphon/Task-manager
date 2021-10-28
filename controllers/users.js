const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const bcrypt = require('bcryptjs');
const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res) => {
  req.body.passwordHash = bcrypt.hashSync(req.body.password, 10)
  const user = await User.create(req.body)
  res.status(201).json({ user })
})

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: userID } = req.params
  const user = await User.findOne({ _id: userID })
  if (!user) {
    return next(createCustomError(`No user with id : ${userID}`, 404))
  }

  res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userID } = req.params
  const user = await User.findOneAndDelete({ _id: userID })
  if (!user) {
    return next(createCustomError(`No user with id : ${userID}`, 404))
  }
  res.status(200).json({ user })
})

const updateUser = asyncWrapper(async (req, res, next) => {
  const { id: userID } = req.params
  if (req.body.password) {
    req.body.passwordHash = bcrypt.hashSync(req.body.password, 10)
  }
  const user = await User.findOneAndUpdate({ _id: userID }, req.body,{
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(createCustomError(`No user with id : ${userID}`, 404))
  }

  res.status(200).json({ user })
})

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
