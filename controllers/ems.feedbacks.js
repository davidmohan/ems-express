const { emsFeedbackSchema } = require('../model/ems.feedbacks')
const json2csv = require('json2csv').parse

/* Get feedbacks based on the event_id */
const getFeedbacksByEventId = async (req, res) => {
  try {
    const data = await emsFeedbackSchema.find({
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

const getFeedbacksCSV = async (req, res) => {
  try {
    const data = await emsFeedbackSchema.find({
      event_id: req.params.event_id
    })

    const finalData = data.map((value) => ({
      FIRST_NAME: value.first_name,
      LAST_NAME: value.last_name,
      DEPARTMENT: value.dept,
      EMAIL: value.email,
      YEAR_OF_STUDY: value.year_of_study,
      GUIDENCE: value.guidence,
      HOSPITALITY: value.hospitality,
      EXPERIENCE: value.experience,
      OPINION: value.opinion,
    }))

    console.log(finalData)

    const csvData = json2csv(finalData);

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  }
  catch (e) {
    res.json({response: false}).status(400)
  }
}

/* Get feedback based on the _id */
const getFeedback = async (req, res) => {
  try {
    const data = await emsFeedbackSchema.findOne({
      _id: req.params.id
    })
    res.json({
      response: true,
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    })
  } 
}

/* Create a new feedback */
const createFeedback = async (req, res) => {
  try {
    const data = new emsFeedbackSchema({ ...req.body })
    await data.save()
    res.json({
      response: true
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  } 
}

/* Update a existing feedback */
const updateFeedback = async (req, res) => {
  try {
    
  } catch (e) {
    
  } 
}

/* Delete a existing feedback */
const deleteFeedback = async (req, res) => {
  try {
    const data = await emsFeedbackSchema.deleteOne({ _id: req.params.id })
    res.json({
      response: true
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  } 
}

const getAllFeedbacks = async (req, res) => {
  try {
    const data = await emsFeedbackSchema.find()
    res.json({
      response: true,
      data: data
    })
  } catch (e) {
    res.json({
      response: false
    })
  }
}

const getFeedbackByEventAndRegNo = async (req, res) => {
  try {
    const data = await emsFeedbackSchema.findOne({ 
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


module.exports = {
  getFeedback,
  getFeedbacksByEventId,
  updateFeedback,
  deleteFeedback,
  createFeedback,
  getFeedbackByEventAndRegNo,
  getAllFeedbacks,
  getFeedbacksCSV
}