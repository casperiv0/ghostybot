# Getting Started

**Only required if self-hosted/wanting to contribute**

[Invite GhostyBot here](https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot+applications.commands&permissions=8)

How to install Ghostybot on your machine

## Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Discord OAuth clientId & clientSecret](https://discord.com/developers/applications) (Only if using dashboard)
- [Node v14+](https://nodejs.org/)
- [FFmpeg](https://ffmpeg.org/download.html) (for music)
- [Mongo URI](https://www.mongodb.com/)

## Api Keys

These api keys are not required for the bot to function. Only required for their desired command.

- [openWeatherMapKey](https://openweathermap.org/)
- [imdbKey](https://www.omdbapi.com/apikey.aspx)
- [mongodbUri](https://www.mongodb.com/cloud/atlas)
- [giphyApiKey](https://developers.giphy.com/)
- [alexflipnoteKey](https://discord.gg/DpxkY3x)
- [pastebin](https://pastebin.com/doc_api)

## config

### .env

#### Required

- `DISCORD_CLIENT_ID`: the client id of your discord bot application
- `DISCORD_CLIENT_SECRET`: the client secret of your discord bot application
- `DISCORD_BOT_TOKEN`: Your bot token
- `MONGO_DB_URI`: your mongoDb uri

#### Not required

_Not required, some may be required for some commands_

- `DEV_MODE`: development mode
- `DEBUG_MODE`: debugging mode
- `IMDB_KEY`: the key for the IMDB API
- `FEEDBACK_CHANNEL_ID`: discord channelId for your feedback channel
- `GIPHY_API_KEY`: the key for the giphy API
- `BUG_REPORTS_CHANNEL_ID`: discord channelId for your bug-reports channel
- `ERRORLOGS_CHANNEL_ID`: discord channelId for your error-logs channel
- `OPEN_WEATHER_MAP_API_KEY`: the key for the openweathermap API
- `PASTE_CLIENT_KEY`: the key for the pastebin API

- `DASHBOARD_ENABLED`: wether the dashboard is enabled
- `NEXT_PUBLIC_DASHBOARD_BOTNAME`: the name of your bot
- `NEXT_PUBLIC_DASHBOARD_URL`: the full URL for your dashboard
- `DASHBOARD_DISCORD_API_URL`: the URL to the Discord API
- `DASHBOARD_JWT_SECRET`: secret string of random characters
- `DASHBOARD_CALLBACK_URL`: the full URL to your dashboard + `/api/auth/callback`
- `DASHBOARD_PORT`: the port your dashboard should run on
- `OWNERS`: string of all owners

## Installation

1. Clone the repo: `git clone https://github.com/Dev-CasperTheGhost/ghostybot`
2. Install all dependencies: `npm install`
3. Rename `.env.example` to `.env`: `Linux: cp .env.example .env`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications) and grab the tokens
5. Copy your tokens and paste into `.env` [more info about the .env](#env)
6. Modify `.env` where needed [more info about .env](#env)
7. Run `npm run build` to create the dashboard and bot
8. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js --name ghostybot`

---

[Return to index](README.md)
