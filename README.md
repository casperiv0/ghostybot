# Ghostybot

A cool Discord bot

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
| say         | owl    |          | dadjoke      |        |       | dependencies |
|             |        |          | dice         |        |       | emojis       |
|             |        |          | flipcoin     |        |       | help         |
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
|             |        |          | wyr          |        |       | wordclock    |
