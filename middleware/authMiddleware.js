const jwt = require("jsonwebtoken");
const secret = require("../controllers/token");


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // checj son web token exists // and verified
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
        // lets recreate signiture in order to check if it is valid
    } else {
        res.redirect("/login");
    }
}

module.exports = {requireAuth};