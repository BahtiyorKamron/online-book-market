const pg = require('../util/pg')
const btn = require('../config/options')
const opt = require('../config/type_book.js')
module.exports = class controller {
  static async controller(message,bot){
    let user = {
      id:message.from.id,
      first_name:message.from.first_name,
      username:message.from.username
    }
    let users = await pg(false,'select * from book_shelf_users')
    let there_is_user = users.find(u => u.id==user.id)
    if(!there_is_user){
      let joining_users = await pg(true,'insert into book_shelf_users(id,first_name,username) values($1,$2,$3) returning *',user.id,user.first_name,user.username)
    }
    if(message.text=='/admin'){

      if(message.from.id=='2023671991' ){
        bot.sendMessage(message.from.id,"Salom Admin✋\nNima xizmat😊",btn.button2)
      }else{
        bot.sendMessage(message.from.id, `📚Salom ${message.from.first_name} bu online kitob do'koni!\n🔍Siz qanday turdagi kitob qidiryapsiz?`, opt);
      }

    }else if (message.text=='/start'){
      await bot.sendMessage(message.from.id, `📚Salom ${message.from.first_name} bu online kitob do'koni!\n🔍Siz qanday turdagi kitob qidiryapsiz?`, opt);
      await bot.sendMessage(message.chat.id, "Kerakli xizmatni tanlashingiz mumkin!", btn.button);


    }


  }
}
