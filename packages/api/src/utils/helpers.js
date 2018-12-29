const path = require("path");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV || "development";
const conf = require(path.resolve(__dirname, "../config/application.json"))[
  env
];

/**
 * To encrypt password
 */
exports.sec_encrypt_password = data => {
  var encoded = JSON.stringify(data);
  encoded = new Buffer.from(encoded).toString("base64");
  var cipher = crypto.createCipher("aes-256-cbc", conf.app_key);
  var crypted = cipher.update(encoded, "utf-8", "hex");
  crypted += cipher.final("hex");

  return crypted;
};

/**
 * To decrypt password
 */
exports.sec_decrypt_password = data => {
  var decipher = crypto.createDecipher("aes-256-cbc", conf.app_key);
  var decrypted = decipher.update(data, "hex", "utf-8");
  try {
    decrypted += decipher.final("utf-8");
    decrypted = new Buffer.from(decrypted, "base64").toString("ascii");
    decrypted = JSON.parse(decrypted);
  } catch (error) {
    decrypted = null;
  }

  return decrypted;
};

/**
 * Generate token
 */
exports.sec_generate_token = pyload => {
  var token = jwt.sign(pyload, Buffer.from(conf.app_key, "base64"), {
    expiresIn: "30 days"
  });
  return token;
};

/**
 * Verify token
 */
exports.sec_verify_token = pyload => {
  const tokenData = Object.assign({
    err: undefined,
    bad: undefined,
    user_id: undefined,
    user_email: undefined
  });

  jwt.verify(pyload, Buffer.from(conf.app_key, "base64"), function(
    err,
    decoded
  ) {
    if (err) {
      tokenData.err = err.message;
    }

    if (decoded === undefined) {
      tokenData.bad = 1;
    } else {
      tokenData.user_id = decoded.id;
      tokenData.user_email = decoded.email;
    }
  });

  return tokenData;
};
