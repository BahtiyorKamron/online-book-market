const fetch = require("node-fetch")
const TOKEN = `5192006001:AAHdhkPfd6Btt6AHI7hHVGSGgFvejN933Fc`

module.exports = async (id,text)=>{
  let res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      chat_id:id,
      text:text,
      reply_markup:{
        inline_keyboard:[
          [
            {
              text:text,
              callback_data:'detektiv'
            }
          ]
        ]

      }
    })
  })

}
