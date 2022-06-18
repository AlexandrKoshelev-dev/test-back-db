const { User } = require("../db")
class profileController {
  async getUsers(req, res) {
    try {
      const users = await User.findAll({ order: [["createdAt", "DESC"]] })
      console.log(req.query.page)
      return res.json(
        users.slice((+req.query.page - 1) * 10 - 1, +req.query.page * 10 - 1)
      )
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: "some error" })
    }
  }
  async getOne(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params["id"] } })
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res
        .status(400)
        .json({ message: "Пользователя с таким id не существует" })
    }
  }
  async edit(req, res) {
    try {
      const { firstname, secondname, email, sex, photo } = req.body
      await User.update(
        { firstname, secondname, email, sex, photo },
        { where: { id: req.params["id"] } }
      )
      return res
        .status(200)
        .json({ message: "Информация о пользователе изменена" })
    } catch (e) {
      console.log(e)
      return res
        .status(400)
        .json({ message: "Пользователя с таким id не существует" })
    }
  }
}
module.exports = new profileController()
