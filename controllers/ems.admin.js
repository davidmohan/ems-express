const { default: axios } = require("axios");
const { emsAdminSchema } = require("../model/ems.admin");
const crypto = require('crypto')

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
    const user_res = await axios.post("http://localhost:5000/ems/user/create",userData);
    // const user_res = await createUser(userData)
    if (user_res.data.response) {
      res
        .json({
          response:"Admin true",
        })
        .status(200);
    }
  } catch (e) {
    console.log(e)
    res.json({
      response: "Admin false",
    }).status(400);
  }
};



module.exports = {
  createAdmin
}