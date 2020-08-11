# Full docs in one file

## Installation

**Only required if self-hosted/wanting to contribute**

[Invite GhostyBot here](https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8)

How to install Ghostybot on your machine

### Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Node v14+](https://nodejs.org/)
- [Youtube Api key](https://developers.google.com/youtube/v3/getting-started)
- [FFmpeg](https://ffmpeg.org/download.html)

### Usage

1. Clone the repo: `git clone https://github.com/Dev-CasperTheGhost/ghostybot`
2. Install all dependencies: `npm install`
3. Rename `config.example.json` to `config.json`: `mv config.example.json config.json`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications)
5. Copy your token and paste into `config.json`
6. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js --name ghostybot`

## Command options

these are the available options for the commands

| Option      | Description                           |
| ----------- | ------------------------------------- |
| name        | name of the command                   |
| description | description of the command            |
| category    | category of the command               |
| aliases     | array for aliases                     |
| usage       | usage of the command                  |
| cooldown    | amount of seconds                     |
| options     | options will show in the help command |


## Bot events

all events the bot uses for audit-logs and welcome messages

#### welcome message

| Name              | Description                              |
| ----------------- | ---------------------------------------- |
| guildMemberAdd    | A new member joined the server/guild     |
| guildMemberRemove | A member left/was kicked from the server |

#### Audit logs

| Name          | Description               |
| ------------- | ------------------------- |
| channelCreate | A new channel was created |
| channelDelete | A channel was deleted     |
| channelUpdate | A channel was updated     |
| emojiCreate   | A new emoji was created   |
| emojiDelete   | An emoji was deleted      |
| emojiUpdate   | An emoji was updated      |
| roleCreate    | A role was created        |
| roleDelete    | A role was deleted        |
| roleUpdate    | A role was updated        |
| messageDelete | A message was deleted     |

## API's used

these are the api url's that ghostybot uses.

| Command      | URL                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| meme         | [https://meme-api.herokuapp.com/gimme](https://meme-api.herokuapp.com/gimme)                                                             |
| bunny        | [https://api.bunnies.io/v2/loop/random/?media=gif,png](https://api.bunnies.io/v2/loop/random/?media=gif,png)                             |
| cat          | [https://nekos.life/api/v2/img/meow](https://nekos.life/api/v2/img/meow)                                                                 |
| catfact      | [https://cat-fact.herokuapp.com/facts?animal_type=cat](https://cat-fact.herokuapp.com/facts?animal_type=cat)                             |
| dog          | [https://dog.ceo/api/breeds/image/random](https://dog.ceo/api/breeds/image/random)                                                       |
| dogfact      | [https://cat-fact.herokuapp.com/facts?animal_type=dog](https://cat-fact.herokuapp.com/facts?animal_type=dog)                             |
| duck         | [https://random-d.uk/api/v1/random?type=gif](https://random-d.uk/api/v1/random?type=gif)                                                 |
| fox          | [https://randomfox.ca/floof/](https://randomfox.ca/floof/)                                                                               |
| lizard       | [https://nekos.life/api/v2/img/lizard](https://nekos.life/api/v2/img/lizard)                                                             |
| owl          | [http://pics.floofybot.moe/owl](http://pics.floofybot.moe/owl)                                                                           |
| snailfact    | [https://cat-fact.herokuapp.com/facts?animal_type=snail](https://cat-fact.herokuapp.com/facts?animal_type=snail)                         |
| advice       | [https://api.adviceslip.com/advice](https://api.adviceslip.com/advice)                                                                   |
| clyde        | [https://nekobot.xyz/api/imagegen?type=clyde&text=hello%20world](https://nekobot.xyz/api/imagegen?type=clyde&text=hello%20world)         |
| dadjoke      | [https://icanhazdadjoke.com/slack](https://icanhazdadjoke.com/slack)                                                                     |
| hug          | [https://nekos.life/api/hug](https://nekos.life/api/hug)                                                                                 |
| kiss         | [https://nekos.life/api/kiss](https://nekos.life/api/kiss)                                                                               |
| owo          | [https://rra.ram.moe/i/r?type=owo](https://rra.ram.moe/i/r?type=owo)                                                                     |
| boobs        | [http://api.oboobs.ru/boobs/0/1/random](http://api.oboobs.ru/boobs/0/1/random)                                                           |
| butt         | [http://api.obutts.ru/butts/0/1/random](http://api.obutts.ru/butts/0/1/random)                                                           |
| neko         | [https://nekobot.xyz/api/image?type=neko](https://nekobot.xyz/api/image?type=neko)                                                       |
| instagram    | [https://instagram.com](https://instagram.com)                                                                                           |
| minecraft    | [https://mcapi.us/server/status?ip=](https://mcapi.us/server/status?ip=)                                                                 |
| github       | [https://api.github.com/](https://api.github.com/)                                                                                       |
| birb         | [https://api.alexflipnote.dev/birb](https://api.alexflipnote.dev/birb)                                                                   |
| changemymind | [https://nekobot.xyz/api/imagegen?type=changemymind&text=helloworld](https://nekobot.xyz/api/imagegen?type=changemymind&text=helloworld) |
| supreme      | [https://api.alexflipnote.dev/supreme?text=helloworld](https://api.alexflipnote.dev/supreme?text=helloworld)                             |
| weather      | [http://api.openweathermap.org/data/2.5/weather](http://api.openweathermap.org/data/2.5/weather)                                         |

##
[Return to index](README.md)