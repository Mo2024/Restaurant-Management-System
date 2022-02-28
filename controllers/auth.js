const User = require('../models/user');
const validator = require('validator');
const { valid } = require('joi');

module.exports.createUser = async (req, res, next) => {
    try {
        let { email, username, password, confirmPassword } = req.body;
        if (validate(req, res, next, email, username, password, confirmPassword)) return

        username = username.toLowerCase()
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Thank you for signing up!')
            res.redirect('/main')
        })

    } catch (e) {
        console.log(e)
        req.flash('error', e.message)
        res.redirect('/register')

    }

}

module.exports.loginUser = (req, res) => {
    res.render('auth/login')
}

module.exports.postUser = (req, res) => {
    req.flash('success', 'welcome back!')
    const redirectUrl = req.session.returnTo || '/main'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.registerPage = (req, res) => {
    res.render('auth/register')
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/main');
}

function validate(req, res, next, email, username, password, confirmPassword) {
    let userRegex = new RegExp("^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
    let strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!userRegex.test(username)) {
        let msg = ["Only alphanumeric characters between 4-20, an underscore and a dot are allowed", "An underscore and a dot cannot be next to each other nor two underscores or two dots"]
        req.flash('error', 'Please make sure that your username has the following:')
        req.flash('li', msg)
        res.redirect('/register')
        return true
    }
    else if (!validator.isEmail(email)) {
        req.flash('error', 'Invalid email entered. Please try again.')
        res.redirect('/register')
        return true
    }
    else if (password !== confirmPassword) {
        req.flash('error', 'Passwords didn’t match. Please try again.')
        res.redirect('/register')
        return true
    }
    else if (!strongPass.test(password)) {
        let msg = ["At least one capital letter", "At least 8 characters, 1 capital letter, 1 small letter, 1 number, and 1 special character Example: !@#\$%\^&\*"]
        req.flash('error', 'Please make sure that your password has the following:')
        req.flash('li', msg)
        res.redirect('/register')
        return true
    }
}