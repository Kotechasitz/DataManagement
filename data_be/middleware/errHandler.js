module.exports = (err, req, res, next) =>{

    const code = err.code || 500;

    return res.status(code).json({
         error: {
             status_code: code,
             message: err.message,
             validation: err.validation
         }
    });
}