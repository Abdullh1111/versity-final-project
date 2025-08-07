import app from "./app"
import config from "./config"
import { connectDB } from "./config/db"

const port = config.PORT
app.listen(port, async () => {
  await connectDB()
  console.log(`Example app listening on port ${port}`)
})