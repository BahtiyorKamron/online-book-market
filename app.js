const telegram_bot = require("node-telegram-bot-api")
const pg = require('./util/pg')
const controller = require('./controllers/type_books')
const admins_services = require('./controllers/services_for_admin')
const controller_show_books = require('./controllers/show_books')
const services = require('./controllers/services')
const TOKEN = require('./config/env').token
const option = {
  polling:true
}
const bot = new telegram_bot(TOKEN,option)


bot.on('callback_query',message=>{

  admins_services.do(message,bot)
  controller_show_books.show(message,bot)

})


bot.on('text',async (message)=>{
  console.log(message);
   services.type_books(message,bot)
   services.join_basket(message,bot)
   services.search_book(message,bot)
   admins_services.join_book(message,bot)
   admins_services.remove_book(message,bot)
   controller.controller(message,bot)

})
