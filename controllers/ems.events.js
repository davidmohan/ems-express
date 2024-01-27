const { emsEventSchema } = require('../model/ems.events')

/* Get all events */
const getAllEvents = async (req, res) => {
  try {
    const data = await emsEventSchema.find()
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

/* Get a single event by _id */
const getEventById = async (req, res) => {
  try {
    const data = await emsEventSchema.findOne({
      _id: req.params.id
    })
    res.json({
      response: true,
      data: data
    }).status(200)
  } catch (e) {
    res.json({
      response: false,
    }).status(400)
  }
}

/* Get a events by year_of_study and dept */
const getEventsByYearAndDept = async (req, res) => {
  try {
    const data = await emsEventSchema.find({
      year_can_participate: { $eq: req.params.year },
      dept_can_participate: { $eq: req.params.dept }
    })
    console.log(data)
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

/* Create a event */
const createEvent = async (req, res) => {
  try {
    const data = new emsEventSchema({
      ...req.body
    })
    await data.save()
    res.json({ response: true }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}

/* Delete event */
const deleteEvent = async (req, res) => {
  try {
    const data = await emsEventSchema.deleteOne({
      _id: req.params.id
    })
    res.json({ response: true }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}

/* Update event */
const updateEvent = async (req, res) => {
  try {
    const data = await emsEventSchema.updateOne({
      _id: req.params.id,
    }, {
      $set: {
        event_name: req.body.event_name,
        dept_can_participate: req.body.dept_can_participate,
        year_can_participate: req.body.year_can_participate,
        venue: req.body.venue,
        event_type: req.body.event_type,
        amount: req.body.amount,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        brochure: req.body.brochure,
        summary: req.body.summary,
        status: req.body.status,
        get_feedbacks: req.body.get_feedbacks
      }
    })
    res.json({ response: true }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}

const getEventByStaff = async (req, res) => {
  try {
    const data = await emsEventSchema.find({ ref_id: req.params.staff_id })
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

const eventStatusUpdate = async (req, res) => {
  try {
    const data = await emsEventSchema.updateOne(
      { _id: req.params.event_id },
      { $set: {
        status: req.body.value
      }
    })
    res.json({
      response: true
    }).status(200)
  } catch (e) {
    res.json({
      response: false
    }).status(400)
  }
}

const feedbackStatusUpdate = async (req, res) => {
  try {
    const data = await emsEventSchema.updateOne(
      { _id: req.params.event_id },
      { $set: {
        feedback_status: req.body.value
      }
    })
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
  getAllEvents,
  getEventById,
  getEventsByYearAndDept,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByStaff,
  eventStatusUpdate,
  feedbackStatusUpdate
}