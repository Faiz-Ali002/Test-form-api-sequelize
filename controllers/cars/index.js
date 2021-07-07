const models = require("../../models");
const jwt = require("jsonwebtoken");
const getcar = async (req, res) => {
  try {
    let u = await models.Car.findAll({
      where: {
        userId: req.params.usersId,
      },
    });
    res.send(u);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const postcar = async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let user = req.body;

        let dbuser = {
          carName: user.carName,
          model: user.model,
          color: user.color,
          userId: req.params.usersId,
        };
        console.log(dbuser);

        let u = await models.Car.create(dbuser);
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

const putcar = async (req, res) => {
  try {
    const up_id = await models.User.findByPk(req.params.usersId);
    const u_id = await models.Car.findByPk(req.params.carsId);
    if (up_id != null && u_id != null) {
      let car = req.body;
      const updatedUser = await models.Car.update(
        {
          carName: car.carName,
          model: car.model,
          color: car.color,
        },
        { where: { id: req.params.carsId }, returning: true }
      );

      res.send(updatedUser[1][0]);
    } else {
      res.status(404).send({
        message: "The server has not found anything matching the URI given !",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deletecar = async (req, res) => {
  try {
    const up_id = await models.User.findByPk(req.params.usersId);
    const u_id = await models.Car.findByPk(req.params.carsId);
    console.log(up_id);

    if (up_id != null && u_id != null) {
      let car = req.body;
      const updatedUser = await models.Car.destroy({
        where: { id: req.params.carsId },
      });

      res.status(200).send({
        message: "Deleted!",
      });
    } else {
      res.status(404).send({
        message: "The server has not found anything matching the URI given !",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getcar,
  postcar,
  putcar,
  deletecar,
};
