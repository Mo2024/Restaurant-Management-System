module.exports.sizeLimit = 1000000 //4mb

module.exports.limitHandler = (err, req, res, next) => {
    if (err) {
        if (err.message === "File too large") {
            req.flash('error', `The maximum file size is ${sizeLimit / 1000000} MB`)
            res.redirect('/admin/new')
            return
        }
        // console.log(err.message)
        throw new ExpressError(err.message, 400)

    } else {
        next()
    }
}