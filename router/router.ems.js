const { Router } = require("express");

const {
  createStaff,
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/ems.staff");

const {
  getAllUsers,
  getUser,
  authUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByRefId,
} = require("../controllers/ems.user");

const {
  createStd,
  getAllStds,
  getStd,
  updateStd,
  deleteStd,
} = require("../controllers/ems.std");

const {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByYearAndDept,
  updateEvent,
  deleteEvent,
  getEventByStaff,
  eventStatusUpdate,
  feedbackStatusUpdate
} = require("../controllers/ems.events");

const {
  createRegistration,
  getRegistrationsByEventId,
  getRegistration,
  updateRegistration,
  deleteRegistration,
  getRegistrationByEventAndRegNo,
  getRegistrationCSV,
} = require("../controllers/ems.registrations");

const {
  createFeedback,
  getFeedbacksByEventId,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getFeedbackByEventAndRegNo,
  getFeedbacksCSV,
} = require("../controllers/ems.feedbacks");

const {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/ems.admin");

const EmsRouter = Router();

/* Users */
EmsRouter.post("/user/create", createUser);
EmsRouter.get("/user/all", getAllUsers);
EmsRouter.get("/user/:id", getUser);
EmsRouter.get("/user/auth/:email/:password", authUser);
EmsRouter.put("/user/:ref_id", updateUser);
EmsRouter.get("/user/update/:ref_id", getUserByRefId);
EmsRouter.delete("/user/:ref_id", deleteUser);

/* Admin */
EmsRouter.post("/admin/create", createAdmin);
EmsRouter.get("/admin/all", getAllAdmins);
EmsRouter.get("/admin/:id", getAdmin);
EmsRouter.put("/admin/:id", updateAdmin);
EmsRouter.delete("/admin/:id", deleteAdmin);

/* Staff  */
EmsRouter.post("/staff/create", createStaff);
EmsRouter.get("/staff/all", getAllStaffs);
EmsRouter.get("/staff/:id", getStaff);
EmsRouter.put("/staff/:id", updateStaff);
EmsRouter.delete("/staff/:id", deleteStaff);

/* Students */
EmsRouter.post("/std/create", createStd);
EmsRouter.get("/std/all", getAllStds);
EmsRouter.get("/std/:id", getStd);
EmsRouter.put("/std/:id", updateStd);
EmsRouter.delete("/std/:id", deleteStd);

/* Events */
EmsRouter.post("/event/create", createEvent);
EmsRouter.get("/event/all", getAllEvents);
EmsRouter.get("/event/:id", getEventById);
EmsRouter.get("/event/:year/:dept", getEventsByYearAndDept);
EmsRouter.get("/event/f/staff/:staff_id", getEventByStaff);
EmsRouter.put("/event/:id", updateEvent);
EmsRouter.put("/event/s/u/:event_id", eventStatusUpdate);
EmsRouter.put("/event/fbstatus/u/:event_id", feedbackStatusUpdate);
EmsRouter.delete("/event/:id", deleteEvent);

/* Registrations */
EmsRouter.post("/registration/create", createRegistration);
EmsRouter.get("/registration/:event_id/:reg_no", getRegistrationByEventAndRegNo);
EmsRouter.get("/registration/e/g/:event_id", getRegistrationsByEventId);
EmsRouter.get("/registration/:id", getRegistration);
EmsRouter.put("/registration/:id", updateRegistration);
EmsRouter.delete("/registration/:id", deleteRegistration);
EmsRouter.get("/registration/csv/generate/:event_id", getRegistrationCSV)

/* Feedbacks */
EmsRouter.post("/feedback/create", createFeedback);
EmsRouter.get("/feedback/all/:event_id", getFeedbacksByEventId);
EmsRouter.get("/feedback/all", getAllFeedbacks);
EmsRouter.get("/feedback/one/:event_id/:reg_no", getFeedbackByEventAndRegNo);
EmsRouter.get("/feedback/:id", getFeedback);
EmsRouter.put("/feedback/:id", updateFeedback);
EmsRouter.delete("/feedback/:id", deleteFeedback);
EmsRouter.get("/feedback/csv/generate/:event_id", getFeedbacksCSV)

module.exports = {
  EmsRouter,
};
