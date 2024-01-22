const { default: axios } = require("axios");
const { emsStdSchema } = require('../model/ems.std')
var crypto = require('crypto')

/* Get all the Std's */
const getAllStds = async (req, res) => {
  try {
    const data = await emsStdSchema.find()
    res.json({
      response: true,
      count: data.length,
      data: data
    }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}

/* Get a Std by _id */
const getStd = async (req, res) => {
  try {
    const data = await emsStdSchema.findOne({ _id: req.params.id })
    console.log(data)
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

/* Create a Std */
const createStd = async (req, res) => {
  try {
    const hash = getHashedPassword(req.body.password)
    const saveData = { ...req.body, password: hash }
    const data = new emsStdSchema(saveData)
    const db_res = await data.save()
    const userData = {
      email: data.email,
      password: data.password,
      privilege: data.privilege,
      ref_id: db_res._id,
    };
    const user_res = await axios.post("http://localhost:5000/ems/user/create",userData);
    if (user_res.data.response) {
      res.json({ response: true }).status(200);
    }
  } catch (e) {
    res.json({ response: false}).status(400)
  }
}

/* Update a Std */
const updateStd = async (req, res) => {
  try {
    const data = await emsStdSchema.updateOne({ _id: req.params.id }, { $set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      privilege:req.body.privilege,
      reg_no: req.body.reg_no,
      dept: req.body.dept,
      year_of_study: req.body.year_of_study,
      gender: req.body.gender
    }})
    const userUpdate = await axios.put(`http://localhost:5000/ems/user/${req.params.id}`, {
      password: req.body.password,
    })
    res.json({ response: "staff true" }).status(200)
  } catch (e) {
    res.json({ response: "staff false" }).status(400)
  }
}

/* Delete a Std */
const deleteStd = async (req, res) => {
  try {
    const data = await emsStdSchema.deleteOne({ _id: req.params.id })
    const user_res = await axios.delete(`http://localhost:5000/ems/user/${req.params.id}`)
    res.json({ response: "std true "}).status(200)
  } catch (e) {
    res.json({ response: "std false "}).status(400)
  }
}



module.exports = {
  getAllStds,
  getStd,
  createStd,
  updateStd,
  deleteStd
}