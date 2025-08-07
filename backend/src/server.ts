import app from "./app"
import config from "./config"

const port = config.PORT
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
})