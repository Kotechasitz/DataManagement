module.exports.isAdmin = (req, res, next) => {
    try {
        const { role } = req.user
        if(role !== 'admin'){
            const error = new Error('You do not have permission.');
            error.code = 403;
            throw error
        }
        next();
    } catch (error) {
        next(error);
    }
}