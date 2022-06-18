const validator = require("email-validator")
const jwt = require("jsonwebtoken")
const { secret } = require("../config")

class authMiddleware {
  async checkEmail(req, res, next) {
    try {
      if (!validator.validate(req.body.email)) {
        return res.status(400).json({ message: "Такой почты не сущестует" })
      }
      next()
    } catch (e) {
      console.log(e)
    }
  }

  async auth(req, res, next) {
    try {
      const token = req.cookies.token
      if (!token) {
        return res.status(401).json({ message: "Пользователь не авторизован" })
      }
      const decodedData = jwt.verify(token, secret)
      if (decodedData.id === +req.params["id"]) {
        req.user = decodedData
        if (!req.body.email) {
          req.body.email = decodedData.email
        }
        next()
      } else {
        return res
          .status(401)
          .json({ message: "Нет доступа к этому пользователю" })
      }
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "some error" })
    }
  }
}
module.exports = new authMiddleware()
