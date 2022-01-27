module.exports =  {
button:{reply_markup: JSON.stringify({
  one_time_keyboard:true,
  resize_keyboard:true,
  keyboard: [
    [{ text: '📚Kıtob turları', callback_data: '1' },
    { text: "🗑Savatga qo'shısh", callback_data: '2' }
    ],
    [{ text: '🔎Kıtob qıdırısh', callback_data: '3' }]
  ]
})},
button2:{reply_markup:{inline_keyboard:[
  [
    {text:"📖➕Yangi kitob qo'shish",callback_data:"join_book"}
  ],
  [
    {text:"📖➖Keraksiz kitobni o'chirish",callback_data:"remove_book"}
  ],
  [
    {text:"🔍Mavjud kitoblarni ko'rish",callback_data:"show_books"}
  ]
]}},
button3:{
reply_markup: {
  inline_keyboard:  [
    [
      {
        text: '🌍Baadiy Asarlar',
        callback_data: 0
      },
      {
        text: '✝️☪️✡️Diniy kitoblar',
        callback_data: 1
      }
    ],
    [
      {
        text:"✏️📚Ilmiy kitoblar",
        callback_data: 2
      },
      {
        text:"📂👨‍🎨Avtobiografik",
        callback_data: 3
      }
    ]
  ]
}
}
};
