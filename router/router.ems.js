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
} = require("../controllers/ems.events");

const {
  createRegistration,
  getRegistrationsByEventId,
  getRegistration,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/ems.registrations");

const {
  createFeedback,
  getFeedbacksByEventId,
  getFeedback,
  updateFeedback,
  deleteFeedback,
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
EmsRouter.put("/event/:id", updateEvent);
EmsRouter.delete("/event/:id", deleteEvent);

/* Registrations */
EmsRouter.post("/registration/create", createRegistration);
EmsRouter.get("/registration/event/:event_id", getRegistrationsByEventId);
EmsRouter.get("/registration/:id", getRegistration);
EmsRouter.put("/registration/:id", updateRegistration);
EmsRouter.delete("/registration/:id", deleteRegistration);

/* Feedbacks */
EmsRouter.post("/feedback/create", createFeedback);
EmsRouter.get("/feedback/all", getFeedbacksByEventId);
EmsRouter.get("/feedback/:id", getFeedback);
EmsRouter.put("/feedback/:id", updateFeedback);
EmsRouter.delete("/feedback/:id", deleteFeedback);

module.exports = {
  EmsRouter,
};
