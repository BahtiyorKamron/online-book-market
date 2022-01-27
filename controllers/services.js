const btn = require('../config/options')
const pg = require("../util/pg")
let marker = 0
let marker1 = 0
module.exports = class controller {
     static async type_books(message,bot){
       try {
         if(message.text=="📚Kıtob turları"){
          bot.sendMessage(message.from.id,"Do'konimizda mavjud kitob turlari",btn.button3)
         }
       } catch (e) {
         console.log(e.message);
       }
     }
     static async join_basket(message,bot){
       try {
           if(message.text=="🗑Savatga qo'shısh"){
             marker1 = 0
             marker=1
             bot.sendMessage(message.from.id,"🗑Sotib olmoqchi bo'lgan kitoblaringizning ID raqamlarini yozing!")
           }
           if(marker==1){
             let book_ids = [...message.text.split(',')]

             for(let i of book_ids){
               if((+i)%1!==0) throw new Error("❌Noto'g'ri tanlov")
               let book = await pg(true,'select * from books where id=$1',i)
               if(!book) throw new Error("❌Bunday ID li kitob mavjud emas")
             }

             bot.sendMessage(message.from.id,"✅Tanlaga kitoblaringiz savatchaga muvaffaqiyatli qo'shildi",{parse_mode:"Markdown"})
             marker = 0
           }
       } catch (e) {
           bot.sendMessage(message.from.id,e.message)
       }
     }
     static async search_book(message,bot){
       let msg = null
       try {
           if(message.text=='🔎Kıtob qıdırısh'){
             msg = "🔎Kıtob qıdırısh"
             marker=0
             await bot.sendMessage(message.from.id,"Qidirayotgan kitobingizni nomini yozing:",{parse_mode:"Markdown"})
             marker1 = 1


           }
           if(marker1==1 && msg!=="🔎Kıtob qıdırısh" ){
             bot.sendMessage(message.from.id,"Qidirilmoqda")
             let msg = "Qidirilmoqda"
             setTimeout(async()=>{
               for(let i = 0;i<=36000;i++){
                 if(i%2000==0){
                   msg += "#"
                   if(i==36000) msg="Siz qidirgan kitoblar:"
                 await  bot.editMessageText(msg, {chat_id: message.chat.id, message_id: message.message_id+1})

                 }
               }
             },1500)
             let book_name = message.text.split(" ")
             let result = await pg(false,'select * from books')

             for(let i of result){

               bot.sendMessage(message.from.id,`*📌ID raqami* :${i.id}\n*📖Nomi* :${i.nomi}\n*💵Narxi* :${i.narxi} so'm\n *🧧Turi* :${type_book[i.turi]}\n*〽️Muallifi* :${i.aftori}`,{parse_mode:"Markdown"})
             }

           }
       } catch (e) {

       }finally{
         marker1=0
       }
     }
}
