module.exports.login_get = (req, res) => {
    console.log("heree");
    // res.render('login');
};

module.exports.login_post = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    res.send('new login');
};