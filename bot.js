const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const session = require("telegraf/session");
const { reply } = Telegraf;

const bot = new Telegraf(process.env.BOT_TOKEN);

// Login widget events
bot.on("connected_website", ({ reply }) => reply("Website connected"));

// Telegram passport events
bot.on("passport_data", ({ reply }) => reply("Telegram password connected"));

// Random location on some text messages
bot.on("text", ({ replyWithLocation }, next) => {
  console.log("text to me");
  if (Math.random() > 0.2) {
    return next();
  }
  return Promise.all([
    replyWithLocation(Math.random() * 180 - 90, Math.random() * 180 - 90),
    next()
  ]);
});

bot.command("cat", ({ replyWithPhoto }) => replyWithPhoto(randomPhoto));

// Streaming photo, in case Telegram doesn't accept direct URL
bot.command("cat2", ({ replyWithPhoto }) =>
  replyWithPhoto({ url: randomPhoto })
);

// Look ma, reply middleware factory
bot.command("foo", reply("http://coub.com/view/9cjmt"));

// Wow! RegEx
bot.hears(/reverse (.+)/, ({ match, reply }) =>
  reply(
    match[1]
      .split("")
      .reverse()
      .join("")
  )
);

// Launch bot
bot.launch(() => console.log("runed bot"));
module.exports = bot;
