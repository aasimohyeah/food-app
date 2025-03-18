const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]; //from Headers area of Postman
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      //decode contains the decoded value; (err,decode)=> is a callback fn
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize user",
        });
      } else {
        req.body.id = decode.id; //decode.id means id parameter included in jwt token(decode)
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};
