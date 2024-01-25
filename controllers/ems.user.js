const { default: axios } = require('axios')
const { emsUserSchema } = require('../model/ems.user')
const crypto = require('crypto')

const createUser = async (req, res) => {
  try {
    const data = new emsUserSchema({...req.body})
    // console.log(data)
    await data.save()
    res.json({ response: true }).status(200)
  } catch(e) {
    res.json({ response: false }).status(400)
  }
}


// API's
// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const data = await emsUserSchema.find()
    res.json({
      response: true,
      count: data.length,
      data: data
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  }
}

// Get Single User by _id
const getUser = async (req, res) => {
  try {
    const data = await emsUserSchema.findOne({ _id: req.params.id })
    // console.log(data)
    res.json({
      response: true,
      data: data
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  }
}

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash;  
}

// Authenticating User by Email and Password
const authUser = async (req, res) => {
  try {
    const hash = getHashedPassword(req.params.password)
    const data = await emsUserSchema.findOne({
      email: req.params.email,
      password: hash
    })
    res.json({
      response: true,
      ref_id: data._id
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  }
}

const updateUser = async (req, res) => {
  try {
    const res_data = await emsUserSchema.updateOne({
      ref_id: req.params.ref_id
    }, {
      $set: {
        password: req.body.password,
        privilege: req.body.privilege
      }
    })
    res.json({ response: true }).status(200)
  } catch (e) {
    // console.log(data)
    res.json({ response: false }).status(400)
  }
}

const deleteUser = async (req, res) => {
  try {
    const data = await emsUserSchema.deleteOne({
      ref_id: req.params.ref_id
    })
    res.json({ response: true, data: data }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}

const getUserByRefId = async (req, res) => {
  try {
    const data = await emsUserSchema.findOne({
      ref_id: req.params.ref_id
    })
    res.json({ response: true, data: data }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}


module.exports = {
  createUser,
  getAllUsers,
  getUser,
  authUser,
  updateUser,
  deleteUser,
  getUserByRefId
}