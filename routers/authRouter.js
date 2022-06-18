const Router = require("express")
const router = new Router()
const { check } = require("express-validator")
const authMiddleware = require("../middlewares/authMiddleware")
const controller = require("../controllers/authController")

router.post(
  "/register",
  [
    check("firstname", "Имя пользователя не должно быть пустым!").notEmpty(),
    check("email", "Email пользователя не должно быть пустым!").notEmpty(),
    check(
      "password",
      "Пароль пользователя должен быть длиннее 4 символов"
    ).isLength({ min: 4 }),
  ],
  authMiddleware.checkEmail,
  controller.registration
)

router.post(
  "/login",
  [check("email", "Email пользователя не должно быть пустым!").notEmpty()],
  controller.login
)

module.exports = router
