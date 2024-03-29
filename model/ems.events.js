const { default: mongoose } = require("mongoose");
const { emsdb } = require("../db/ems.db");

const schema = mongoose.Schema({
  event_name: {
    type: String
  },
  dept_can_participate: {
    type: Array
  },
  year_can_participate: {
    type: Array
  },
  venue: {
    type: String
  },
  graduation: {
    type: String
  },
  event_type: {
    type: String
  },
  amount: {
    type: String
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  // brochure: {
  //   type: Buffer
  // },
  summary: {
    type: String
  },
  ref_id: {
    type: String
  },
  status: {
    type: Boolean
  },
  contact_number: {
    type: Number
  },
  contact_email: {
    type: String
  },
  feedback_status: {
    type: Boolean
  },
})

const emsEventSchema = emsdb.model('events', schema)

module.exports = {
  emsEventSchema
}