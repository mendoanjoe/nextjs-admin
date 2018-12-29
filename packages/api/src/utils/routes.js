const express = require("express");
const helper = require("./helpers");

/**
 * Controller module
 */
const authController = require("../controllers/auth");
const itemController = require("../controllers/items");

/**
 * To verify request on routes
 */
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token === undefined) {
    res.status(401).send({
      status: 401,
      success: false,
      message: "Missing token."
    });
  } else {
    let data_verify = helper.sec_verify_token(token);

    if (data_verify.err !== undefined) {
      res.status(401).send({
        status: 401,
        success: false,
        message: data_verify.err
      });
    }

    if (data_verify.bad !== undefined) {
      res.status(401).send({
        status: 401,
        success: false,
        message: "Bad credentials."
      });
    }

    req.user_id = data_verify.user_id;
    req.user_email = data_verify.user_email;
    next();
  }
}

/**
 * Module routes
 */
module.exports = app => {
  const route = express.Router();
  const conf = app.get("configuration");
  const db = app.get("db");

  app.get("/", async (req, res) => {
    res.status(200).send({ message: conf.appversion });
  });

  /**
   * API Auth Routes
   */
  route.post("/signin", async (req, res) => {
    authController.signin(req, res);
  });

  route.post("/signup", async (req, res) => {
    authController.signup(req, res);
  });

  route.get("/me", verifyToken, async (req, res) => {
    authController.me(req, res);
  });

  route.get("/items", verifyToken, async (req, res) => {
    itemController.all(req, res);
  });

  route.get("/item/:id", verifyToken, async (req, res) => {
    itemController.get(req, res);
  });

  route.put("/item/:id", verifyToken, async (req, res) => {
    itemController.update(req, res);
  });

  route.delete("/item/:id", verifyToken, async (req, res) => {
    itemController.delete(req, res);
  });

  route.post("/items", verifyToken, async (req, res) => {
    itemController.create(req, res);
  });

  app.use("/api/" + conf.appversion, route);
};
