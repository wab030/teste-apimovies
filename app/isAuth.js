const isAuth = (req, res, next) => {
    console.log('[isAuth]', req.session);
    if(req.session.user) {
        // res.end('Usuário logado.');
        next();
    } else {
        res.status(401).end('Usuário não autenticado.');
        return;
    }
};

module.exports = isAuth;