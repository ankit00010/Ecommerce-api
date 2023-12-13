// Import constants module to access predefined error status codes
const { constants } = require('../constants');

// Error handler middleware function
const errorHandler = (err, req, res, next) => {
    // Determine the HTTP status code from the response or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Switch statement to handle different error scenarios based on status codes
    switch (statusCode) {
        // Handle validation errors
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;

        // Handle not found errors
        case constants.NOT_FOUND:
            console.log("Reached");
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;

        // Handle forbidden errors
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;

        // Handle unauthorized errors
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;

        // Handle generic server errors
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;

        // Default case if no matching status code is found
        default:
            console.log("No Error!!!");
            break;
    }
}

// Export the error handler middleware for use in the application
module.exports = errorHandler;
