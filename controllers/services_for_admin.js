const pg = require('../util/pg')
const path = require('path')
const writedata = require('../config/write_data')
const readdata = require('../config/read_data')
const book = require('../temporary_data.js')
let check = 0
let counter =0
let removeBook = 0
module.exports = class service {
  static async do(message,bot){

      try{
        if(message.message.chat.id==2023671991 && ['remove_book','join_book','show_books'].includes(message.data)){
        if(message.data=='join_book'){
          check=1
          removeBook = 0
          bot.sendMessage(message.message.chat.id,"Kitob nomini kiriting:")
        }else if(message.data=='show_books'){
          check = 0
          removeBook = 0
          let books = await pg(false,'select * from books')
          if(!books.length) throw new Error("Do'konda kitob yo'q")
          for(let i of books){
            let type_book = ["Badiy Asar","Diniy","Ilmiy","Avtobiografik"]
            bot.sendMessage(message.message.chat.id,`*📌ID raqami* :${i.id}\n*📖Nomi* :${i.nomi}\n*💵Narxi* :${i.narxi} so'm\n *🧧Turi* :${type_book[i.turi]}\n*〽️Muallifi* :${i.aftori}`,{parse_mode:"Markdown"})
          }
        }else if(message.data=='remove_book'){
          check = 0
          bot.sendMessage(message.message.chat.id,"O'chirmoqchi bo'lgan kitobingizning ID raqamlarini kiriting:")
          removeBook = 1
        }
      }
    }catch(e){
      bot.sendMessage(message.message.chat.id,e.message)
    }

  }

  static async join_book(message,bot){
    counter++

    if(check==1 && message.from.id==2023671991 ){
        // let book = readdata(path.join(process.cwd(),'temporary_data.js'))
        book.name = message.text
        // writedata(path.join(process.cwd(),'temporary_data.js'),book)
        bot.sendMessage(message.from.id,"Kitob narxini kiriting:")
        check=2
        message.from.id=0
    }
    if(check==2 && message.from.id==2023671991 ){
      // let book = readdata(path.join(process.cwd(),'temporary_data.js'))
      book.price = message.text
      // console.log(book);
      // writedata(path.join(process.cwd(),'temporary_data.js'),book)
      bot.sendMessage(message.from.id,"Kitob turini kiriting kiriting:\n*0-Baddiy asar\n1-Diniy\n2-Ilmiy\n3-Avtobiografik*",{parse_mode:"Markdown"})
      check=3
      message.from.id=0
    }
    if(check==3 && message.from.id==2023671991 ){
      // let book = readdata(path.join(process.cwd(),'temporary_data.js'))
      book.type = message.text
      // writedata(path.join(process.cwd(),'temporary_data.js'),book)
      bot.sendMessage(message.from.id,"Kitob muallifini ismini kiriting:")
      check=4
      message.from.id=0
    }if(check==4 && message.from.id==2023671991 ){
      // let book = readdata(path.join(process.cwd(),'temporary_data.js'))
      book.aftor = message.text
      let type_book = ["Badiy Asar","Diniy","Ilmiy","Avtobiografik"]
      let joining_book = await pg(true,`insert into books(
        nomi,narxi,turi,aftori
      ) values ($1,$2,$3,$4) returning *`,book.name,book.price,book.type,book.aftor)

      if(joining_book){
        check = 0
        bot.sendMessage(message.from.id,`*✅Kitob muvaffaqiyatli qo'shildi:\n📖Nomi:${book.name}\n💵Narxi:${book.price} so'm\n🧧Turi:${type_book[book.type]}\n〽️Muallifi:${book.aftor}*`,{parse_mode:"Markdown"})
      }
    }
  }
  static async remove_book(message,bot){
    if(removeBook==1 && message.from.id==2023671991){
      let book_ids = [...message.text.split(',')]
      let msg_id =0
      try{
        for(let i of book_ids){
          if((+i)%1!==0) throw new Error("❌Noto'g'ri tanlov")
        }




        let array = []
        for(let i of book_ids){
          let removing = await pg(true,'delete from books where id=$1 returning *',i)
          if(removing){
            console.log('here');
            array.push(removing)
          }

        }
        if(array.length==book_ids.length){
          msg_id = message.message_id + 1
          let msg = "O'chirilmoqda"
          bot.sendMessage(message.from.id,msg,{parse_mode:"Markdown"})
          setTimeout(async()=>{
            for(let i = 0;i<=36000;i++){
              if(i%2000==0){
                msg += "#"
                if(i==36000) msg="✅🗑Siz aytgan kitoblar muvaffaqiyatli o'chirildi"
              await  bot.editMessageText(msg, {chat_id: message.chat.id, message_id: msg_id})

              }
            }
          },1500)

        }else{
          throw new Error("O'chirishda muammo chiqdi boshqatdan tekshirib keyin yana urinign ko'rish")
        }






      }catch(e){
        bot.sendMessage(message.from.id,e.message)
      }


  }
}}
