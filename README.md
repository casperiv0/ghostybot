<a href="https://ghostybot.tk" align="center">
     <img src=".github/Ghostybot-banner.png" alt="banner" />               
</a>

![license](https://img.shields.io/github/license/dev-caspertheghost/ghostybot?style=for-the-badge&color=gr) ![contr](https://img.shields.io/github/contributors/dev-caspertheghost/ghostybot?color=gr&style=for-the-badge) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b2d5dfb844dc4626bd813a4ca831eb43?style=for-the-badge)](https://app.codacy.com/manual/Dev-CasperTheGhost/ghostybot?utm_source=github.com&utm_medium=referral&utm_content=Dev-CasperTheGhost/ghostybot&utm_campaign=Badge_Grade_Dashboard?style=for-the-badge)

# Ghostybot

A Custom Discord bot with a lot of commands for Discord communities. (+90 commands)

[Invite ghostybot here](https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8)

## Table of contents

- [Features](#features)
- [Requirements](https://github.com/Dev-CasperTheGhost/ghostybot#requirements)
- [Usage](https://github.com/Dev-CasperTheGhost/ghostybot#usage)
- [Commands](https://github.com/Dev-CasperTheGhost/ghostybot#commands)
- [API's used](https://github.com/Dev-CasperTheGhost/ghostybot#apis-used)

## Features

- Easy to use
- Enable/disable welcome messages
- Play games
- Use util commands to get your avatar, botinfo, channelinfo and more
- Play music
- Get animal pictures/gifs
- And more!

## Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Node](https://nodejs.org/)
- [Youtube Api key](https://developers.google.com/youtube/v3/getting-started)
- [FFmpeg](https://ffmpeg.org/download.html)

## Usage

1. Clone the repo: `git clone https://github.com/Dev-CasperTheGhost/ghostybot`
2. Install all dependencies: `npm install`
3. Rename `config.example.json` to `config.json`: `mv config.example.json config.json`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications)
5. Copy your token and paste into `config.json`
6. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js --name ghostybot`

## Commands

| Admin       | Animal | Botowner | Games        | Music      | NSFW  | util         | Economy |
| ----------- | ------ | -------- | ------------ | ---------- | ----- | ------------ | ------- |
| addrole     | bunny  | eval     | 8ball        | pause      | boobs | avatar       | balance |
| ban         | cat    | shutdown | advice       | play       | butt  | botinfo      | daily   |
| ctopic      | dog    |          | bet          | queue      | neko  | bugreport    | deposit |
| kick        | duck   |          | block        | resume     |       | channelinfo  | work    |
| lockchannel | fox    |          | calc         | skip       |       | define       |
| removerole  | lizard |          | clyde        | stop       |       | delete       |
| say         | owl    |          | dadjoke      | leave      |       | dependencies |
| sticky      | cow    |          | dice         | volume     |       | emojis       |
| unsticky    | panda  |          | flipcoin     | nowplaying |       | help         |
| prefix      | cowsay |          | happiness    |            |       | instagram    |
| announce    |        |          | hug          |            |       | minecraft    |
| set         |        |          | iq           |            |       | morse        |
| unset       |        |          | kiss         |            |       | poll         |
|             |        |          | owo          |            |       | randomcolor  |
|             |        |          | ping         |            |       | roleinfo     |
|             |        |          | randomjoke   |            |       | roles        |
|             |        |          | randomnumber |            |       | serverinfo   |
|             |        |          | rps          |            |       | translate    |
|             |        |          | wyr          |            |       | userinfo     |
|             |        |          | ascii        |            |       | wordclock    |
|             |        |          |              |            |       | uptime       |
|             |        |          |              |            |       | github       |
|             |        |          |              |            |       | channels     |
|             |        |          |              |            |       | suggest      |

## API's used

| Command   | URL                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| meme      | [https://meme-api.herokuapp.com/gimme](https://meme-api.herokuapp.com/gimme)                                                     |
| bunny     | [https://api.bunnies.io/v2/loop/random/?media=gif,png](https://api.bunnies.io/v2/loop/random/?media=gif,png)                     |
| cat       | [https://nekos.life/api/v2/img/meow](https://nekos.life/api/v2/img/meow)                                                         |
| catfact   | [https://cat-fact.herokuapp.com/facts?animal_type=cat](https://cat-fact.herokuapp.com/facts?animal_type=cat)                     |
| dog       | [https://dog.ceo/api/breeds/image/random](https://dog.ceo/api/breeds/image/random)                                               |
| dogfact   | [https://cat-fact.herokuapp.com/facts?animal_type=dog](https://cat-fact.herokuapp.com/facts?animal_type=dog)                     |
| duck      | [https://random-d.uk/api/v1/random?type=gif](https://random-d.uk/api/v1/random?type=gif)                                         |
| fox       | [https://randomfox.ca/floof/](https://randomfox.ca/floof/)                                                                       |
| lizard    | [https://nekos.life/api/v2/img/lizard](https://nekos.life/api/v2/img/lizard)                                                     |
| owl       | [http://pics.floofybot.moe/owl](http://pics.floofybot.moe/owl)                                                                   |
| snailfact | [https://cat-fact.herokuapp.com/facts?animal_type=snail](https://cat-fact.herokuapp.com/facts?animal_type=snail)                 |
| advice    | [https://api.adviceslip.com/advice](https://api.adviceslip.com/advice)                                                           |
| clyde     | [https://nekobot.xyz/api/imagegen?type=clyde&text=hello%20world](https://nekobot.xyz/api/imagegen?type=clyde&text=hello%20world) |
| dadjoke   | [https://icanhazdadjoke.com/slack](https://icanhazdadjoke.com/slack)                                                             |
| hug       | [https://nekos.life/api/hug](https://nekos.life/api/hug)                                                                         |
| kiss      | [https://nekos.life/api/kiss](https://nekos.life/api/kiss)                                                                       |
| owo       | [https://rra.ram.moe/i/r?type=owo](https://rra.ram.moe/i/r?type=owo)                                                             |
| boobs     | [http://api.oboobs.ru/boobs/0/1/random](http://api.oboobs.ru/boobs/0/1/random)                                                   |
| butt      | [http://api.obutts.ru/butts/0/1/random](http://api.obutts.ru/butts/0/1/random)                                                   |
| neko      | [https://nekobot.xyz/api/image?type=neko](https://nekobot.xyz/api/image?type=neko)                                               |
| instagram | [https://instagram.com](https://instagram.com)                                                                                   |
| minecraft | [https://mcapi.us/server/status?ip=](https://mcapi.us/server/status?ip=)                                                         |
| github    | [https://api.github.com/](https://api.github.com/)                                                                               |
