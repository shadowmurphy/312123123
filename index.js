const { Telegraf, session, Scenes: { BaseScene, Stage }, Markup, Telegram, Composer } = require('telegraf');
const express = require('express')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.command('/start', ctx => ctx.replyWithHTML(`<b>Приветствую, ${ctx.message.from.username} 👋</b>\n\nНажмите на кнопку ниже, чтобы приобрести архив!`, Markup.inlineKeyboard([
//     [Markup.button.callback('Сделать заказ 💳', 'Order')]
// ])))

const app = require('express')
app.get('/', (req, res) => {
    res.sendFile('index.html', {
      root: __dirname
    })
  })

bot.command('web', async ctx => {
    bot.telegram.callApi('setChatMenuButton', {
      chat_id: ctx.from.id,
      menu_button: {
        text: 'Приобрести',
        type: 'web_app',
        web_app: {
          url: 'http://project5487465.tilda.ws'
        }
      }
    })
    })
bot.command('start', ctx => {

    const html = `
    <strong>Приветствую, ${ctx.from.username} 👋</strong>

Нажмите на кнопку ниже, чтобы приобрести архив!
    `

    bot.telegram.sendMessage(ctx.from.id, html, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Сделать заказ 💳',
                    web_app: {
                        url: 'https://myapp.herokuapp.com/'
                    }
                }]
            ]
        }
    })

})
bot.command('pay', async ctx => {
    bot.telegram.sendMessage(ctx.from.id, 'Оплата', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Оплатить 💳',
                    callback_data: '123',
                }]
            ],
        }
    })
})
// const stage = new Stage([  ]);
// stage.hears('exit', ctx => ctx.scene.leave())
// bot.use(session(), stage.middleware());

bot.launch({
    webhook: {
      domain: 'myapp.herokuapp.com',
      port: +process.env.PORT,
      cb: app
    }
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));