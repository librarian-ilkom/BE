const { ClientError } = require('../../errors/classes/super/client.error')
const { FirebaseError } = require('../../../node_modules/firebase-admin/lib/utils/error.js')
const logger = require('../../utils/logger.util')

module.exports = (err, req, res, next) => {

    const errMessage = err.message
    const errCode = err.HTTPcode

    if (err instanceof ClientError)
        return res.status(errCode).json({
            success: false,
            code: errCode,
            message: errMessage
        })

    else if ( err instanceof FirebaseError)
        return res.status(400).json({
            success: false,
            code: 400,
            message: errMessage
        })

    logger.error('error-handler', errMessage)
    
    return res.status(500).json({
        success: false,
        code: 500,
        message: "Internal server error"
    })
}