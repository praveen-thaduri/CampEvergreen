const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res,next) => {
    try {
        const {email, username, password } = req.body;
        const user = new User({email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if(err) return next(err);
            req.flash('success', ' Welcome to CampEvergreen');
            res.redirect('/campgrounds');
        })

    } catch (e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    req.flash('success', 'Welcome back to CampEvergreen');
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Successfully Logged Out');
        res.redirect('/campgrounds');
    });
}