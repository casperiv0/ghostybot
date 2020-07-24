const fetch = require("node-fetch");

module.exports = {
    name: "snailfact",
    description: "Returns a snail fact",
    category: "animal",
    async execute(bot, message) {
        fetch("https://cat-fact.herokuapp.com/facts?animal_type=snail")
            .then(res => res.json())
            .then(async data => {
                const fact = data.all[Math.floor(Math.random() * data.all.length)];
                await message.channel.send(fact.text);
            });
    }
};