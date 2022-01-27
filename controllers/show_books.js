const pg = require('../util/pg')
let counter = 0
module.exports = class books {
  static async show(message,bot){
      let type_book = message.data
      if([0,1,2,3].includes(+type_book)){

        try {

           let book = await pg(false,'select * from books where turi=$1',type_book)

           if(!book.length) throw new Error("Bu turdagi kitoblar qolmadi!Uzur☺️")
           else{

             let type_book = ["Badiy Asar","Diniy","Ilmiy","Avtobiografik"]
            await bot.sendMessage(message.message.chat.id,`➖➖➖➖${type_book[book[0].turi]}➖➖➖`,{parse_mode:"Markdown"})
             setTimeout(()=>{
               for(let i of book){
                 counter +=  book.length
                bot.sendMessage(message.message.chat.id,`*📌ID raqami* :${i.id}\n*📖Nomi* :${i.nomi}\n*💵Narxi* :${i.narxi} so'm\n *🧧Turi* :${type_book[i.turi]}\n*〽️Muallifi* :${i.aftori}`,{parse_mode:"Markdown"})
               }
             },0)

           }
        } catch (e) {
          bot.sendMessage(message.message.chat.id,e.message)
        }

      }

  }
}
