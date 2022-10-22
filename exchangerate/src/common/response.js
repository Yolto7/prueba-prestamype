const dictMessage = require('../common/response-message')

function responseOk(res, data, code) {
  res.status(200);
  res.json({
    error: false,
    status: 200,
    code,
    message: dictMessage[code],
    data
  })
}

function responseAppError(res, code, message) {
  res.status(422)
  res.json({
    error: true,
    status: 422,
    code,
    message,
    data: null
  })
}

module.exports = {
  responseOk,
  responseAppError
}