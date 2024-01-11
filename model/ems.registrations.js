const { default: mongoose } = require("mongoose");
const { emsdb } = require('../db/ems.db')

const schema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  reg_no: {
    type: String,
    unique: true
  },
  dept: {
    type: String
  },
  year_of_study: {
    type: String
  },
  registration: {
    type: Boolean
  },
  event_id: {
    type: String
  },
})


const emsRegistrationSchema = emsdb.model('registrations', schema)

module.exports = {
  emsRegistrationSchema
}