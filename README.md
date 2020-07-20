# Ghostybot

A cool Discord bot

## Usage

1. Clone the repo: `git clone https://github.com/Dev-CasperTheGhost/ghostybot`
2. Install all dependencies: `npm install`
3. Rename `config.example.json` to `config.json`: `mv config.example.json config.json`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications)
5. Copy your token and paste into `config.json`
6. Run the bot: `npm start`
    - Using pm2: `pm2 start src/index.js --name ghostybot`