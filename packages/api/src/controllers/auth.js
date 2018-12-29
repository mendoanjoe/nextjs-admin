const helper = require("../utils/helpers");
const userModel = require("../models/users");

module.exports = {
  signin : async (req, res) => {
    userModel.findOne({ email: req.body.email, password: helper.sec_encrypt_password(req.body.password) }, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      if(data){
        let TOKENC = helper.sec_generate_token({
          id: data.id,
          email: data.email
        });

        res.status(200).send({
          status: 200,
          success: true,
          message: "OK.",
          token: TOKENC
        });
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          message: "Incorrect email or password."
        });
      }
    });
  },
  signup : async (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      if(data){
        res.status(400).send({
          status: 400,
          success: false,
          message: "Email is invalid or already taken."
        });
      } else {
        req.body.password = helper.sec_encrypt_password(req.body.password);
        const User = new userModel(req.body);
        User.save((err) => {
          if(err) res.status(400).send({
            status: 400,
            success: false,
            message: "Bad request."
          });

          res.status(200).send({
            status: 200,
            success: true,
            message: "OK."
          });
        })
      }
    })
  },
  me : async (req, res) => {
    userModel.findOne({ _id : req.user_id }, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      if(data){
        data.password = null;
        res.status(200).send({
          status: 200,
          success: true,
          message: "OK.",
          data: [data]
        });
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          message: "Bad request."
        });
      }
    });
  }
}
