module.exports = (req, res, next) => {
    if(!req.session.isAuth){
        return res.render('admin/', {
            message: "Admin paneline erişim için yetkiniz yok! Lütfen önce giriş yapınız."
        });
    }
    next();
}