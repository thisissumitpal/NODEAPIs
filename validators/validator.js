const _=require('lodash');
const Joi = require('joi');
const Boom = require('boom');
const SendResponse = require('../apiHandler');

module.exports = (useJoiError = false, schema) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'patch', 'put', 'delete'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: true, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: false // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req, res, next) => {
    const route = req.route.path;
    // console.log(route)
    // console.log(req)
    const method = req.method.toLowerCase();
    if (_.includes(_supportedMethods, method) && _.has(schema, route)) {

      // get schema for the current route
      const _schema = _.get(schema, route);
      if (_schema) {

        // Validate req.body using the schema and validation options
        return Joi.validate(req.body,_schema,_validationOptions, async (err, data) => {
          if (err) {
            // console.log(err);
            // Joi Error
            const JoiError = {
              status: 'failed',
              error: {
                original: err._object,

                // fetch only message and type from each error
                details: _.map(err.details, ({ message, type }) => ({
                  message: message.replace(/['"]/g, ''),
                  type
                }))
              }
            };

            // Custom Error
            // let errMsg = err.details[0].message.replace(/['"]/g, '') + '.';
            let errMsg = err.details[0].message.replace(/['"]/g, '');

            const customError = Boom.badData(errMsg);

            // Send back the JSON error response
            SendResponse(res, customError);
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data;
            next();
          }
        });
      }
    }
    next();
  };
};