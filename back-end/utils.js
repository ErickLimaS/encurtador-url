const shortUuid = require("short-uuid");
const jwt = require("jsonwebtoken")

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

function generateToken(data) {

  return jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: '1h'})

}

function isAuth(req, res, next) {

  if(!req.headers.authorization){
    next();
    return
  }

  const authorization = req.headers.authorization

  // Authorization: Bearer ****
  const token = authorization.slice(7, authorization.length)

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

    if(err){
      return res.status(401).json(response(false, "Erro com seu Token. Tente limpar os Cookies do navegador."))
    }
    else{
      req.body.creator = decode.data
      
      next()
    }
  })

}

module.exports = { generateUniqueId, response, generateToken, isAuth };
