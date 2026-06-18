const config = require("./utils/config")
const app = require("./app")

app.listen(config.PORT, ()=>{
    console.log(`app is running on ${config.PORT}`)
})