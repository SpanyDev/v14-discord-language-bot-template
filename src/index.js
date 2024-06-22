const {
    ActivityType,
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    ApplicationCommandType,
    EmbedBuilder,
    Message,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
const configFile = require('./config');
const consola = require('consola');
const AntiCrash = require('./Utils/Functions/AntiCrash.js');
const { embed } = require('./Utils/Functions/embed.js');
const i18next = require('i18next');
const translationBackend = require('i18next-fs-backend');

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: Object.values(Partials),
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
    presence: {
        status: 'dnd',
        activities: [
            {
                name: 'with the APIa',
                type: ActivityType.Playing,
            },
        ],
    },
});

client.commands = new Collection();
client.context = new Collection();
client.config = configFile;
client.embed = embed;

require("./Utils/slashCommandsLoader.js")(client);
require("./Utils/eventsLoader.js")(client);

(async () => {
    await i18next
        .use(translationBackend)
        .init({
            ns: fs.readdirSync("./src/locales/en-US").map((file) => file.replace(".json", "")),
            defaultNS: "commands", // defaultNS'yi doğru bir şekilde ayarlayın
            fallbackLng: "en-US",
            preload: fs.readdirSync("./src/locales"),
            backend: {
                loadPath: "./src/locales/{{lng}}/{{ns}}.json",
            },
        });
})()



AntiCrash()
client.login(client.config.token);
