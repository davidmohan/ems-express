const { emsFeedbackSchema } = require('../model/ems.feedbacks')

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


module.exports = {
  getFeedback,
  getFeedbacksByEventId,
  updateFeedback,
  deleteFeedback,
  createFeedback
}