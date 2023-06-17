const shortUuid = require("short-uuid");

function generateUniqueId() {

    return shortUuid.generate()

}

function response(isSuccessful, message, data) {
  return {
    success: isSuccessful,
    message: message,
    response: data || null,
  };
}

module.exports = { generateUniqueId, response };
