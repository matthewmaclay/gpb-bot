require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT;

const bot = require('./bot');

app.use(cors());
app.use(bodyParser());

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});
const empty = 'Не указано';
app.get('/send', ({ body: { name, phone, car } }, response) => {
  const text = `
Добрый день!
Ваше резюме рассмотрено, когда вам удобно было бы с нами пообщаться?
`;
  bot.telegram.sendMessage(process.env.CHAT_ID, text);
  response.send('Hello from Express!');
});

app.post(
  '/sto',
  ({ body: { carType, serviceCategory, serviceTitle, phone } }, response) => {
    const text = `
Авто: ${carType || empty}
Категория услуг: ${serviceCategory || empty}
Услуга: ${serviceTitle || empty}
Телефон: ${phone || empty}
`;
    bot.telegram.sendMessage(process.env.STO_CHAT_ID, text);
    response.send('Hello from Express!');
  }
);

app.options('/send', (request, response) => {
  console.log('Options');
  response.send('Hello from Express!');
});

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`, process.env);
});
