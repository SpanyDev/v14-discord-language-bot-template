const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")
const { t } = require('i18next');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setNameLocalizations({
            "tr": 'gecikme',
            "en-US": 'ping',
        })
        .setDescription('Botun gecikmesini ölçer.')
        .setDescriptionLocalizations({
            "tr": 'Botun gecikmesini ölçer.',
            "en-US": 'Measures the bot\'s latency.',
        }),
    run: async (client, interaction) => {
        await interaction.reply({ content: `${t("ping.description", { lng: interaction.locale })}`, ephemeral: true });
    },
};
