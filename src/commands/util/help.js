const { MessageEmbed } = require("discord.js");
const { getServerPrefix } = require("../../utils/functions");

module.exports = {
    name: "help",
    description: "Shows all commands Or shows more info about a command",
    category: "util",
    aliases: ["h"],
    async execute(bot, message, args) {
        const prefix = await getServerPrefix(message.guild.id) || "!";
        const cmdArgs = args[0];

        if (cmdArgs) {
            const cmd = bot.commands.get(cmdArgs) || bot.commands.get(bot.aliases.get(cmdArgs));
            if (!cmd) return message.channel.send("Command or alias not found");


            const aliases = cmd.aliases ? cmd.aliases.map(a => a) : "None";
            const options = cmd.options ? cmd.options.map(option => option) : "None"; 
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`Command: ${cmd.name}`)
                .addField("Aliases", aliases)
                .addField("Description", cmd.description ? cmd.description : "Not specified")
                .addField("Usage", cmd.usage ? `${prefix}${cmd.usage}` : "Not specified")
                .addField("Options", options);

            return message.channel.send(embed);
        }

        const commands = bot.commands;
        const utilsCmds = commands.filter(cmd => cmd.category === "util").map(cmd => cmd.name).join(", ");
        const adminCmds = commands.filter(cmd => cmd.category === "admin").map(cmd => cmd.name).join(", ");
        const animalCmds = commands.filter(cmd => cmd.category === "animal").map(cmd => cmd.name).join(", ");
        const botOwnerCmds = commands.filter(cmd => cmd.category === "botowner").map(cmd => cmd.name).join(", ");
        const gameCmds = commands.filter(cmd => cmd.category === "games").map(cmd => cmd.name).join(", ");
        const musicCmds = commands.filter(cmd => cmd.category === "music").map(cmd => cmd.name).join(", ");
        const nsfwCmds = commands.filter(cmd => cmd.category === "nsfw").map(cmd => cmd.name).join(", ");
        const economyCmds = commands.filter(cmd => cmd.category === "economy").map(cmd => cmd.name).join(", ");
        const levelCmds = commands.filter(cmd => cmd.category=== "levels").map(cmd => cmd.name).join(", ");

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .addField("Admin Commands", `\`\`\`${adminCmds}\`\`\``)
            .addField("Animal Commands", `\`\`\`${animalCmds}\`\`\``)
            .addField("BotOwner Commands", `\`\`\`${botOwnerCmds}\`\`\``)
            .addField("Game Commands", `\`\`\`${gameCmds}\`\`\``)
            .addField("Music Commands", `\`\`\`${musicCmds}\`\`\``)
            .addField("NSFW Commands", `\`\`\`${nsfwCmds}\`\`\``)
            .addField("Util Commands", `\`\`\`${utilsCmds}\`\`\``)
            .addField("Economy Commands", `\`\`\`${economyCmds}\`\`\``)
            .addField("Levels Commands", `\`\`\`${levelCmds}\`\`\``)
            .addField("Server prefix: ", prefix)
            .setDescription(`use \`${prefix}help <command name | alias>\` to view more info about a command\n More info can be found using the \`botinfo\` command`)
            .setTitle("Help");

        message.channel.send(embed);
    }
};