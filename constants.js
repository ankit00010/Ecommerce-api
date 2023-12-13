// Exporting an object containing commonly used HTTP status codes as constants
exports.constants = {
    VALIDATION_ERROR: 400, // Client provided invalid data
    UNAUTHORIZED: 401, // Unauthorized access, typically due to missing or invalid authentication credentials
    FORBIDDEN: 403, // The server understood the request but refuses to authorize it
    NOT_FOUND: 404, // The requested resource could not be found on the server
    SERVER_ERROR: 500, // Generic server error, indicating something went wrong on the server
};
