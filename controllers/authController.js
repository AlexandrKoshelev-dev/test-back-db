const { User } = require("../db")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const { secret } = require("../config")

const generateAccessToken = (id, firstname, email) => {
  const payload = {
    id,
    firstname,
    email,
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors })
      }
      const { firstname, email, password } = req.body
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже создан" })
      }
      const hashPassword = bcrypt.hashSync(password, 5)
      const user = new User({ firstname, email, password: hashPassword })
      await user.save()
      return res.status(200).json({ message: "Пользователь создан" })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Ошибка при регистрации" })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(400).json({
          message: `Пользователь с почтой ${email} не зарегистрирован`,
        })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: "Введён неверный пароль" })
      }
      const token = generateAccessToken(user.id, user.firstname, user.email)
      res.cookie("token", token)
      return res.status(200).json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Ошибка входа" })
    }
  }
}

module.exports = new authController()
