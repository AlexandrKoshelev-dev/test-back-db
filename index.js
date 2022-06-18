const express = require("express")
const PORT = process.env.PORT || 3000
const authRouter = require("./routers/authRouter")
const profileRouter = require("./routers/profileRouter")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/user", authRouter)
app.use("/profiles", profileRouter)

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server run on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
