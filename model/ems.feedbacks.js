const { default: mongoose } = require("mongoose");
const { emsdb } = require('../db/ems.db')

const schema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  dept: {
    type: String
  },
  reg_no: {
    type: String
  },
  hospitality: {
    type: String
  },
  guidence: {
    type: String
  },
  experience: {
    type: String
  },
  opinion: {
    type: String
  },
  event_id: {
    type: String
  },
})


const emsFeedbackSchema = emsdb.model('feedbacks', schema)

module.exports = {
  emsFeedbackSchema
}