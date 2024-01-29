const { default: axios } = require("axios");
const { emsAdminSchema } = require("../model/ems.admin");
const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config()

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

/* Creating a admin Document */
const createAdmin = async (req, res) => {
  try {
    const hash = getHashedPassword(req.body.password)
    const saveData = { ...req.body, password: hash }
    const adminData = new emsAdminSchema(saveData);
    const db_res = await adminData.save();
    // console.log(db_res)
    const userData = {
      email: adminData.email,
      password: adminData.password,
      privilege: adminData.privilege,
      ref_id: db_res._id,
    };
    const user_res = await axios.post(`${process.env.url}/ems/user/create`,userData);
    // const user_res = await createUser(userData)
    if (user_res.data.response) {
      res
        .json({
          response:true,
        })
        .status(200);
    }
  } catch (e) {
    console.log(e)
    res.json({
      response: false,
    }).status(400);
  }
};


const getAllAdmins = async (req, res) => {
  try {
    const data = await emsAdminSchema.find();
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
}

const getAdmin = async (req, res) => {
  try {
    const data = await emsAdminSchema.findOne({ _id: req.params.id });
    res.json({
      response: true,
      data: data,
    }).status(200);
  } catch (e) {
    res.json({ response: false }).status(400);
  }
}

const updateAdmin = async (req, res) => {
  try {
    const data = await emsAdminSchema.updateOne(
      { _id: req.params.id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password,
          privilege: req.body.privilege,
          gender: req.body.gender,
        },
      })
    const userUpdate = await axios.put(`${process.env.url}/ems/user/${req.params.id}`, {
      password: req.body.password,
      privilege: req.body.privilege
    })
    res.json({ response: true }).status(200)
  } catch (e) {
    res.json({ response: false }).status(400)
  }
}

const deleteAdmin = async (req, res) => {
  try {
    const data = await emsAdminSchema.deleteOne({ _id: req.params.id })
    const userDelete = await axios.delete(`${process.env.url}/ems/user/${req.params.id}`)
    res.json({ response: true })
  } catch (e) {
    res.json({ response: false })
  }
}


module.exports = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin 
}