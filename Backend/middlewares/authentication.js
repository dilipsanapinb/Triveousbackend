const jwt = require('jsonwebtoken');
require('dotenv').config();

const protected = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Token not found, Please login first" });
        }
        jwt.verify(token, process.env.secret, function (err, decoded) {
          if (err) {
            res.send({ msg: "Please login First", err: err.message });
          } else {
            const userrole = decoded?.role;
            req.body.userrole = userrole;
            const userId = decoded?.userId;
            req.body.userId = userId;
            next();
          }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:
                "Something went wrong at authenticating the user"
        })
    }
};

module.exports=protected