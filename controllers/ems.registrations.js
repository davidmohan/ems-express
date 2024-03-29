const { default: axios } = require("axios")
const { emsRegistrationSchema } = require("../model/ems.registrations")
const json2csv = require('json2csv').parse

/* Get all the registrations based on the event_id */
const getRegistrationsByEventId = async (req, res) => {
  try {
    const data = await emsRegistrationSchema.find({
      event_id: req.params.event_id
    })
    // console.log(data)
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


const getRegistrationCSV = async (req, res) => {
  try {
    const data = await emsRegistrationSchema.find({
      event_id: req.params.event_id
    })

    const finalData = data.map((value) => ({
      FIRST_NAME: value.first_name,
      LAST_NAME: value.last_name,
      DEPARTMENT: value.dept,
      EMAIL: value.email,
      YEAR_OF_STUDY: value.year_of_study
    }))

    // console.log(finalData)

    const csvData = json2csv(finalData);

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  }
  catch (e) {
    res.json({response: false}).status(400)
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

const getRegistrationByEventAndRegNo = async (req, res) => {
  try {
    const data = await emsRegistrationSchema.findOne({ 
      reg_no: req.params.reg_no,
      event_id: req.params.event_id
    })
    if (data) {
      res.json({
        response: false,
        data: data,
        found: true
      })
    } else {
      res.json({
        response: true,
        found: false
      })
    }
  } catch (e) {
    res.json({
      response: false,
    })
  }
}

/* Create a new registration for a event */
const createRegistration = async (req, res) => {
  try {
    const result = await axios.get(`${process.env.url}/ems/registration/${req.body.event_id}/${req.body.reg_no}`)
    if (result.data.response == true) {
      const data = new emsRegistrationSchema({...req.body})
      data.save()
      res.json({response: true}).status(200)
    } else {
      throw('Already Registered')
    }
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

/* Get Registration by Register Number and Event Id */



module.exports = {
  getRegistration,
  getRegistrationsByEventId,
  createRegistration,
  updateRegistration,
  deleteRegistration,
  getRegistrationByEventAndRegNo,
  getRegistrationCSV
}