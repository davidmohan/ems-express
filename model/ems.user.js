const { default: mongoose } = require('mongoose')
const { emsdb } = require('../db/ems.db')

const schema = mongoose.Schema({
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
  ref_id: {
    type: String
  }
})

const emsUserSchema = emsdb.model('users', schema)

module.exports = {
  emsUserSchema
}