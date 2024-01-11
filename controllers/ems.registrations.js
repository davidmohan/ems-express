const { emsRegistrationSchema } = require("../model/ems.registrations")

/* Get all the registrations based on the event_id */
const getRegistrationsByEventId = async (req, res) => {
  try {
    const data = await emsRegistrationSchema.find({
      event_id: req.params.event_id
    })
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

/* Get registration based on the _id */
const getRegistration = async (req, res) => {
  try {
    const data = await emsRegistrationSchema.findOne({
      _id: req.params.id
    })
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

/* Create a new registration for a event */
const createRegistration = async (req, res) => {
  try {
    const data = new emsRegistrationSchema({ ...req.body })
    await data.save()
    res.json({
      response: true,
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  }
}

/* Update a existing registration by _id */
const updateRegistration = async (req, res) => {
  try {
    
  } catch (e) {
    
  }
}

/* Delete a existing registration by _id */
const deleteRegistration = async (req, res) => {
  try {
    const data = await emsRegistrationSchema.deleteOne({ _id: req.params.id })
    res.json({
      response: true
    }).status(200)
  } catch (e) {
    res.json({
      response: true
    }).status(400)
  }
}


module.exports = {
  getRegistration,
  getRegistrationsByEventId,
  createRegistration,
  updateRegistration,
  deleteRegistration
}