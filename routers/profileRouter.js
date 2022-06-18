const Router = require("express")
const router = new Router()
const controller = require("../controllers/profileController")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/", controller.getUsers)
router.get("/profile/:id", authMiddleware.auth, controller.getOne)
router.put(
  "/profile/:id",
  authMiddleware.auth,
  authMiddleware.checkEmail,
  controller.edit
)
module.exports = router
