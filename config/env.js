const dotenv = require('dotenv')

dotenv.config()

const config = {
  token:process.env.TOKEN
}
module.exports = config
