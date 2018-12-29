const itemModel = require("../models/items");

module.exports = {
  all : async (req, res) => {
    itemModel.find({}, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      res.status(200).send({
        status: 200,
        success: true,
        message: "OK.",
        data: data
      });
    })
  },
  get : async (req, res) => {
    itemModel.findOne({ _id : req.params.id }, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      if(data){
        res.status(200).send({
          status: 200,
          success: true,
          message: "OK."
        });
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          message: "No data."
        });
      }
    })
  },
  create : async (req, res) => {
    const Item = new itemModel(req.body);
    Item.save((err) => {
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
    });
  },
  delete : async (req, res) => {
    itemModel.deleteOne({ _id : req.params.id }, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      if(data){
        res.status(200).send({
          status: 200,
          success: true,
          message: "OK."
        });
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          message: "No data."
        });
      }
    });
  },
  update : async (req, res) => {
    itemModel.updateOne({ _id : req.params.id }, req.body, (err, data) => {
      if(err) res.status(400).send({
        status: 400,
        success: false,
        message: "Bad request."
      });

      if(data){
        res.status(200).send({
          status: 200,
          success: true,
          message: "OK."
        });
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          message: "No data."
        });
      }
    })
  }
}