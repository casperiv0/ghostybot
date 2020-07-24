const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows all commands Or shows more info about a command",
    category: "util",
    execute(bot, message, args) {

        const cmdArgs = args[0];

        if (cmdArgs) {
            const cmd = bot.commands.get(cmdArgs) || bot.commands.get(bot.aliases.get(cmdArgs));
            if (!cmd) return message.channel.send("Command or alias not found");


            const aliases = cmd.aliases ? cmd.aliases.map(a => a) : "None";
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`Command: ${cmd.name}`)
                .addField("Aliases", aliases)
                .addField("Description", cmd.description ? cmd.description : "Not specified")
                .addField("Usage", cmd.usage ? cmd.usage : "Not specified");

            return message.channel.send(embed);
        }

        const commands = bot.commands;
        const utilsCmds = commands.filter(cmd => cmd.category === "util").map(cmd => cmd.name);
        const adminCmds = commands.filter(cmd => cmd.category === "admin").map(cmd => cmd.name);
        const animalCmds = commands.filter(cmd => cmd.category === "animal").map(cmd => cmd.name);
        const botOwnerCmds = commands.filter(cmd => cmd.category === "botowner").map(cmd => cmd.name);
        const gameCmds = commands.filter(cmd => cmd.category === "games").map(cmd => cmd.name);
        const musicCmds = commands.filter(cmd => cmd.category === "music").map(cmd => cmd.name);
        const nsfwCmds = commands.filter(cmd => cmd.category === "nsfw").map(cmd => cmd.name);


        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .addField("Admin Commands", `\`\`\`${adminCmds.join(", ")}\`\`\``)
            .addField("Animal Commands", `\`\`\`${animalCmds.join(", ")}\`\`\``)
            .addField("BotOwner Commands", `\`\`\`${botOwnerCmds.join(", ")}\`\`\``)
            .addField("Game Commands", `\`\`\`${gameCmds.join(", ")}\`\`\``)
            .addField("Music Commands", `\`\`\`${musicCmds.join(", ")}\`\`\``)
            .addField("NSFW Commands", `\`\`\`${nsfwCmds.join(", ")}\`\`\``)
            .addField("Util Commands", `\`\`\`${utilsCmds.join(", ")}\`\`\``)
            .setDescription("use `!help <command name | alias>` to view more info about a command ")
            .setTitle("Help");

        message.channel.send(embed);
    }
};