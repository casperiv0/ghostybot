# Ghostybot

A cool Discord bot

## Table of contents

- [Requirements](https://github.com/Dev-CasperTheGhost/ghostybot#requirements)
- [Usage](https://github.com/Dev-CasperTheGhost/ghostybot#usage)
- [Commands](https://github.com/Dev-CasperTheGhost/ghostybot#commands)
- [API's used](https://github.com/Dev-CasperTheGhost/ghostybot#apis-used)

## Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Node](https://nodejs.org/)
- [Youtube Api key](https://developers.google.com/youtube/v3/getting-started)

## Usage

1. Clone the repo: `git clone https://github.com/Dev-CasperTheGhost/ghostybot`
2. Install all dependencies: `npm install`
3. Rename `config.example.json` to `config.json`: `mv config.example.json config.json`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications)
5. Copy your token and paste into `config.json`
6. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js --name ghostybot`

## Commands

| Admin       | Animal | Botowner | Games        | Music  | NSFW  | util         |
| ----------- | ------ | -------- | ------------ | ------ | ----- | ------------ |
| addrole     | bunny  | eval     | 8ball        | pause  | boobs | avatar       |
| ban         | cat    | shutdown | advice       | play   | butt  | botinfo      |
| ctopic      | dog    |          | bet          | queue  | neko  | bugreport    |
| kick        | duck   |          | block        | resume |       | channelinfo  |
| lockchannel | fox    |          | calc         | skip   |       | define       |
| removerole  | lizard |          | clyde        | stop   |       | delete       |
| say         | owl    |          | dadjoke      | leave  |       | dependencies |
| sticky      | cow    |          | dice         |        |       | emojis       |
| unsticky    |        |          | flipcoin     |        |       | help         |
|             |        |          | happiness    |        |       | instagram    |
|             |        |          | hug          |        |       | minecraft    |
|             |        |          | iq           |        |       | morse        |
|             |        |          | kiss         |        |       | poll         |
|             |        |          | owo          |        |       | randomcolor  |
|             |        |          | ping         |        |       | roleinfo     |
|             |        |          | randomjoke   |        |       | roles        |
|             |        |          | randomnumber |        |       | serverinfo   |
|             |        |          | rps          |        |       | translate    |
|             |        |          | wyr          |        |       | userinfo     |
|             |        |          | ascii        |        |       | wordclock    |
|             |        |          |              |        |       | uptime       |
|             |        |          |              |        |       | github       |

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
