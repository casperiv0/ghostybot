# Installation

**Only required if self-hosted/wanting to contribute**

[Invite GhostyBot here](https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8)

How to install Ghostybot on your machine

## Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Discord OAuth clientId & clientSecret](https://discord.com/developers/applications) (Only if using dashboard)
- [Node v14+](https://nodejs.org/)
- [FFmpeg](https://ffmpeg.org/download.html)
- [Mongo URI](https://www.mongodb.com/)

## Api Keys

These api keys are not required for the bot to function. Only required for their desired command.

- [openWeatherMapKey](https://openweathermap.org/)
- [imdbKey](https://www.omdbapi.com/apikey.aspx)
- [mongodbUri](https://www.mongodb.com/cloud/atlas)
- [giphyApiKey](https://developers.giphy.com/)
- [alexflipnoteKey](https://discord.gg/DpxkY3x)

## config

- `dev`: development (`true`) or production (`false`)
- `JwtSecret`: this value can be anything, make sure it's long
- `owners`: An array of owner ids
- `clientId`: the client id of your discord bot application
- `clientSecret`: the client secret of your discord bot application
- `callbackUrl`: This is the url to authenticate with discord, this is required to be: `YOUR_URL + /api/auth/callback`
  `dashboardUrl`: the URL to your dashboard
- `token`: Your bot token
- `reportsChannelId`: used for the `bugreport` command. All bug reports will be send to that channel
- `openWeatherMapKey`: used for the `weather` command
- `feedbackChannelId`: used for the `feedback` command. All feedback will be send to that channel
- `imdbKey`: your imdb key for the `imdb` command
- `mongodbUri`: your mongoDb uri
- `giphyApiKey`: your Giphy api key, used for the `giphy` command
- `errorLogsChannelId`: the channel id for errors
- `alexflipnoteKey`: required for the `supreme` command

## Usage

1. Clone the repo: `git clone https://github.com/Dev-CasperTheGhost/ghostybot`
2. Install all dependencies: `npm install`
3. Rename `config.example.json` to `config.json`: `mv config.example.json config.json`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications)
5. Copy your token and paste into `config.json`
6. Run `npm run build` to create the dashboard, if you have `enabled: false` for the dashboard, skip this step
7. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js --name ghostybot`

##

[Return to index](README.md)
