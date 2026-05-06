class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = 404
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ForbiddenError'
        this.statusCode = 403
    }
}

class InvalidDataError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidDataError'
        this.statusCode = 422
    }
}

module.exports = {
    NotFoundError,
    ForbiddenError,
    InvalidDataError
}