const { default: mongoose } = require('mongoose')
const { emsdb } = require('../db/ems.db')

const schema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  dept: {
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  privilege: {
    type: String
  },
  gender: {
    type: String
  }
})

const emsStaffSchema = emsdb.model('staffs', schema)

module.exports = {
  emsStaffSchema
}