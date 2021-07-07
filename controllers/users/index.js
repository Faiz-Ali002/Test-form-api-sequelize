const models = require("../../models");
const jwt = require("jsonwebtoken");

const getuser = async (req, res) => {
  try {
    let u = await models.User.findAll({ include: models.Car });
    console.log("-------", u);
    res.send(u);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const postuser = async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let user = req.body;
        console.log(">>>>>>>>>>..", req.body);
        let dbuser = {
          first_name: user.fname,
          last_name: user.lname,
          email: user.email,
          gender: user.gender,
          dob: user.dob,
          phoneno: user.phoneno,
        };

        let u = await models.User.create(dbuser);
        res.send(u);
        // }
      } catch (error) {
        res.status(500).send({
          message: error.errors[0].message,
        });
      }
    }
  });
};
const putuser = async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const up_id = await models.User.findByPk(req.params.id);
        console.log(up_id);

        if (up_id != null) {
          console.log("...........................");
          console.log(up_id);
          let user = req.body;
          const updatedUser = await models.User.update(
            {
              first_name: user.fname,
              last_name: user.lname,
              email: user.email,
              gender: user.gender,
              dob: user.dob,
              phoneno: user.phoneno,
            },
            { where: { id: req.params.id }, returning: true }
          );

          res.send(updatedUser[1][0]);
        } else {
          res.status(404).send({
            message:
              "The server has not found anything matching the URI given !",
          });
        }
      } catch (error) {
        res.status(500).send({
          message: error.message,
        });
      }
    }
  });
};
const deleteuser = async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const up_id = await models.User.findByPk(req.params.id);
        console.log(up_id);

        if (up_id != null) {
          let user = req.body;
          const updatedUser = await models.User.destroy({
            where: { id: req.params.id },
          });

          res.status(200).send({
            message: "Deleted!",
          });
        } else {
          res.status(404).send({
            message:
              "The server has not found anything matching the URI given !",
          });
        }
      } catch (error) {
        res.status(500).send({
          message: error.message,
        });
      }
    }
  });
};
module.exports = {
  getuser,
  postuser,
  putuser,
  deleteuser,
};
