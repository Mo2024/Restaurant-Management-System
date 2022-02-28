module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'you must be signed in');
        return res.redirect('/login');
    }
    next()
}

module.exports.isAdmin = (req, res, next) => {
    let hasRole = req.user.role === "owner" || req.user.role === "admin"
    if (!hasRole) {
        req.flash('error', "You don't have permission to do that");
        return res.redirect('/main');
    }
    next()

}