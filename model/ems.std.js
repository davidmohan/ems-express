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
  },
  reg_no: {
    type: String
  },
  year_of_study: {
    type: String
  }
})

const emsStdSchema = emsdb.model('stds', schema)

module.exports = {
  emsStdSchema
}