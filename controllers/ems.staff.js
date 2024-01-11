const { default: axios } = require("axios");
const { emsStaffSchema } = require("../model/ems.staff");
const crypto = require('crypto')

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash;  
}

/* Create a New Staff Data */
const createStaff = async (req, res) => {
  try {
    const hash = getHashedPassword(req.body.password)
    const saveData = { ...req.body, password: hash }
    const staffData = new emsStaffSchema(saveData);
    // console.log(staffData)
    const db_res = await staffData.save();
    const userData = {
      email: staffData.email,
      password: staffData.password,
      privilege: staffData.privilege,
      ref_id: db_res._id,
    };
    const user_res = await axios.post("http://localhost:5000/ems/user/create",userData);
    // const user_res = await createUser(userData)
    if (user_res.data.response) {
      res
        .json({
          response:"staff true",
        })
        .status(200);
    }
  } catch (e) {
    res
      .json({
        response: "staff false",
      })
      .status(400);
  }
};

/* Get All Staff Data's */
const getAllStaffs = async (req, res) => {
  try {
    const data = await emsStaffSchema.find();
    res
      .json({
        response: true,
        count: data.length,
        data: data,
      })
      .status(200);
  } catch (e) {
    res.json({ response: false }).status(400);
  }
};

/* Get a Staff by _id */
const getStaff = async (req, res) => {
  try {
    const data = await emsStaffSchema.findOne({ _id: req.params.id });
    res.json({
      response: true,
      data: data,
    }).status(200);
  } catch (e) {
    res.json({ response: false }).status(400);
  }
};

/* Update a Staff by _id */
const updateStaff = async (req, res) => {
  try {
    const data = await emsStaffSchema.updateOne(
      { _id: req.params.id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dept: req.body.dept,
          password: req.body.password,
          privilege: req.body.privilege,
          gender: req.body.gender,
        },
      })
    const userUpdate = await axios.put(`http://localhost:5000/ems/user/${req.params.id}`, {
      password: req.body.password,
      privilege: req.body.privilege
    })
    res.json({ response: "staff true" }).status(200)
  } catch (e) {
    res.json({ response: "staff false" }).status(400)
  }
};

/* Delete a Staff by _id */
const deleteStaff = async (req, res) => {
  try {
    const data = await emsStaffSchema.deleteOne({ _id: req.params.id })
    const userDelete = await axios.delete(`http://localhost:5000/ems/user/${req.params.id}`)
    res.json({ response: "staff true" })
  } catch (e) {
    res.json({ response: "staff false" })
  }
}

module.exports = {
  createStaff,
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff
};
