# GhostyBot Command list

> **This list only show regular commands! Slash commands will not show here since they have a nice UI within Discord.**

This command list was automatically generated in [this file](https://github.com/Dev-CasperTheGhost/ghostybot/tree/main/src/scripts/generateCommandList.ts).
GhostyBot has a total of 88 regular commands.

Click any of the command names for more information

## Category list

[admin](#category-admin)

[levels](#category-levels)

[util](#category-util)

[exempt](#category-exempt)

[reactions](#category-reactions)

## Command list

### Category: admin

**Total commands: 36**

[addcmd:](#addcmd) add guild custom commands

[addrole:](#addrole) Add a role to a user

[addroleall:](#addroleall) Add a role to all user of the current server

[announce:](#announce) Announce something in a channel

[ban:](#ban) ban

[blacklistedwords:](#blacklistedwords) Add/remove blacklisted words

[createrole:](#createrole) This command creates a role with the name of what you say

[ctopic:](#ctopic) Update the channel topic

[deafen:](#deafen) Deafen a user

[delcmd:](#delcmd) Delete the custom commannd

[delete:](#delete) Delete message, up to 100

[ignoredchannels:](#ignoredchannels) Add/remove ignored channels

[kick:](#kick) Kick a user

[lockchannel:](#lockchannel) Lock A channel

[mute:](#mute) Mute a user

[nuke:](#nuke) Nuke the current channel, delete all messages of the channel

[removerole:](#removerole) Remove a role from a user

[removeroleall:](#removeroleall) remove a role from all users of the current server

[removeuserwarns:](#removeuserwarns) Remove all warns from a user

[say:](#say) Let the bot say something

[set:](#set) N/A

[stealemoji:](#stealemoji) Steal an emoji from a different server

[sticky:](#sticky) Sticky a message to the bottom of the screen

[tempmute:](#tempmute) Temporary mute someone

[temprole:](#temprole) Give someone a role temporary

[unban:](#unban) unban a user by their id

[undeafen:](#undeafen) Undeafen a user from voice channel

[unlockchannel:](#unlockchannel) Unlock A channel

[unmute:](#unmute) Unmute a user

[unset:](#unset) N/A

[unsticky:](#unsticky) Sticky a message to the bottom of the screen

[voicekick:](#voicekick) voicekick or disconnect a user from a voice channel

[voicemute:](#voicemute) voicemute a user

[voiceunmute:](#voiceunmute) unmute a user from voice channel

[warn:](#warn) Warns a user

[warnings:](#warnings) Returns how many warnings a user has

---

### Category: levels

**Total commands: 5**

[givexp:](#givexp) Give someone Xp

[leaderboard:](#leaderboard) Shows top 10 users with the highest amount of XP

[level:](#level) Get your current level

[resetxp:](#resetxp) reset all users xp for current server

[xp:](#xp) Get xp from a user or yourself

---

### Category: util

**Total commands: 41**

[calc:](#calc) Calculate something

[afk:](#afk) N/A

[avatar:](#avatar) Get user avatar

[bmi:](#bmi) Calculate your BMI

[botinvite:](#botinvite) Returns the bot invite

[bugreport:](#bugreport) Report a bug to your staff

[channels:](#channels) Shows all channels in the server

[country:](#country) Get information about a country

[covid:](#covid) Get covid 19 information

[ctgs:](#ctgs) Create a shortened URL

[define:](#define) Define a word

[docs:](#docs) Returns the request query from discord.js docs

[emojis:](#emojis) Get a random color

[enlarge:](#enlarge) get your emoji enlarged

[feedback:](#feedback) Give feedback about the bot

[github:](#github) Search someone on github

[help:](#help) Shows all commands Or shows more info about a command

[imdb:](#imdb) Get the information about series and movie

[invite:](#invite) Creates an instant invite for the server

[ip:](#ip) Search an IP

[minecraft:](#minecraft) Get info about a minecraft server

[morse:](#morse) Convert a string to morse code

[nasanews:](#nasanews) Looks up an astronomy-related term on NASA's Website

[npm:](#npm) Search packages on npm by their name

[pastebin:](#pastebin) Get a link of pastebin for your text

[playstore:](#playstore) Show Playstore Application Information Of Your Given Name!

[pokemon:](#pokemon) Returns a pokémon information

[poll:](#poll) Create a poll

[randomcolor:](#randomcolor) Get a random color

[roleinfo:](#roleinfo) Shows info about a role

[roles:](#roles) Shows all roles from the guild

[servericon:](#servericon) Shows the server icon

[skin:](#skin) Search for skins from Minecraft

[spotify:](#spotify) Find a track/artist/album via the Spotify API

[suggest:](#suggest) Create a suggestion

[translate:](#translate) Translate a sentence

[uptime:](#uptime) Returns the uptime of the bot

[verify:](#verify) Verify yourself to get guild access

[weather:](#weather) See the weather in a country/city

[web:](#web) Returns a screenshot of the requested website

[wiki:](#wiki) Search something up on Wikipedia

---

### Category: exempt

**Total commands: 4**

[config:](#config) Returns the config

[disable:](#disable) Disables a command

[enable:](#enable) Enables a command

[prefix:](#prefix) Set a prefix for your server

---

### Category: reactions

**Total commands: 2**

[rradd:](#rradd) Add a reaction role

[rrremove:](#rrremove) Add a reaction role

## Detailed command list

## addcmd

**Category:** admin

**Description:** add guild custom commands

**Usage:** `<cmd_name> <cmd_response>`

**Aliases:** N/A

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name(string)`, `command response(string)`

[Back to top](#ghostybot-command-list)

## addrole

**Category:** admin

**Description:** Add a role to a user

**Usage:** `<member> <role>`

**Aliases:** `ar`, `arole`, `giverole`

**Member Permissions:** SEND_MESSAGES, MANAGE_ROLES, ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `member(string)`, `role(string)`

[Back to top](#ghostybot-command-list)

## addroleall

**Category:** admin

**Description:** Add a role to all user of the current server

**Usage:** `<role>`

**Aliases:** `arall`, `aroleall`, `giveroleall`

**Member Permissions:** MANAGE_ROLES, ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `role(string)`

[Back to top](#ghostybot-command-list)

## announce

**Category:** admin

**Description:** Announce something in a channel

**Usage:** `[channel] <text>`

**Aliases:** N/A

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## ban

**Category:** admin

**Description:** ban

**Usage:** `<user>`

**Aliases:** N/A

**Member Permissions:** BAN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, BAN_MEMBERS

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## blacklistedwords

**Category:** admin

**Description:** Add/remove blacklisted words

**Usage:** `<option> [word]`

**Aliases:** `wordsfilter`, `filterwords`, `blacklistedword`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `option(string)`

[Back to top](#ghostybot-command-list)

## config

**Category:** exempt

**Description:** Returns the config

**Usage:** `N/A`

**Aliases:** `conf`, `cfg`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## createrole

**Category:** admin

**Description:** This command creates a role with the name of what you say

**Usage:** `<role_name>`

**Aliases:** N/A

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `role name(string)`

[Back to top](#ghostybot-command-list)

## ctopic

**Category:** admin

**Description:** Update the channel topic

**Usage:** `<channel> <topic>`

**Aliases:** N/A

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## deafen

**Category:** admin

**Description:** Deafen a user

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** DEAFEN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, DEAFEN_MEMBERS

**Required Arguments:** `member(string)`, `reason(string)`

[Back to top](#ghostybot-command-list)

## delcmd

**Category:** admin

**Description:** Delete the custom commannd

**Usage:** `<cmd_name>`

**Aliases:** `removecmd`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name(string)`

[Back to top](#ghostybot-command-list)

## delete

**Category:** admin

**Description:** Delete message, up to 100

**Usage:** `<1-100>`

**Aliases:** `purge`, `clear`

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES, MANAGE_MESSAGES

**Required Arguments:** `amount(number)`

[Back to top](#ghostybot-command-list)

## disable

**Category:** exempt

**Description:** Disables a command

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name | category name(string)`

[Back to top](#ghostybot-command-list)

## enable

**Category:** exempt

**Description:** Enables a command

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name | category name(string)`

[Back to top](#ghostybot-command-list)

## ignoredchannels

**Category:** admin

**Description:** Add/remove ignored channels

**Usage:** `<option> <channel>`

**Aliases:** `igch`, `ic`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `option(string)`, `channel(string)`

[Back to top](#ghostybot-command-list)

## kick

**Category:** admin

**Description:** Kick a user

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** KICK_MEMBERS

**Bot Permissions:** SEND_MESSAGES, KICK_MEMBERS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## lockchannel

**Category:** admin

**Description:** Lock A channel

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** `reason(string)`

[Back to top](#ghostybot-command-list)

## mute

**Category:** admin

**Description:** Mute a user

**Usage:** `<@user>`

**Aliases:** N/A

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES, MANAGE_CHANNELS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## nuke

**Category:** admin

**Description:** Nuke the current channel, delete all messages of the channel

**Usage:** `N/A`

**Aliases:** `channelnuke`

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## prefix

**Category:** exempt

**Description:** Set a prefix for your server

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## removerole

**Category:** admin

**Description:** Remove a role from a user

**Usage:** `N/A`

**Aliases:** `rr`, `rrole`, `takerole`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `member(string)`, `role(string)`

[Back to top](#ghostybot-command-list)

## removeroleall

**Category:** admin

**Description:** remove a role from all users of the current server

**Usage:** `N/A`

**Aliases:** `rrall`, `rroleall`, `takeroleall`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `role(string)`

[Back to top](#ghostybot-command-list)

## removeuserwarns

**Category:** admin

**Description:** Remove all warns from a user

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member(string)`

[Back to top](#ghostybot-command-list)

## say

**Category:** admin

**Description:** Let the bot say something

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `text | type(embed)(string)`

[Back to top](#ghostybot-command-list)

## set

**Category:** admin

**Description:** N/A

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## stealemoji

**Category:** admin

**Description:** Steal an emoji from a different server

**Usage:** `<emoji> [custom name]`

**Aliases:** N/A

**Member Permissions:** MANAGE_EMOJIS_AND_STICKERS

**Bot Permissions:** SEND_MESSAGES, MANAGE_EMOJIS_AND_STICKERS

**Required Arguments:** `emoji(string)`

[Back to top](#ghostybot-command-list)

## sticky

**Category:** admin

**Description:** Sticky a message to the bottom of the screen

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES, MANAGE_MESSAGES

**Required Arguments:** `message(string)`

[Back to top](#ghostybot-command-list)

## tempmute

**Category:** admin

**Description:** Temporary mute someone

**Usage:** `<user> <time> <reason>`

**Aliases:** N/A

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES, MANAGE_CHANNELS

**Required Arguments:** `user(string)`, `time(time)`, `reason(string)`

[Back to top](#ghostybot-command-list)

## temprole

**Category:** admin

**Description:** Give someone a role temporary

**Usage:** `<member> <role> <time>`

**Aliases:** N/A

**Member Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `member(string)`, `role(string)`, `time(time)`

[Back to top](#ghostybot-command-list)

## unban

**Category:** admin

**Description:** unban a user by their id

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** BAN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, BAN_MEMBERS

**Required Arguments:** `member_id(string)`

[Back to top](#ghostybot-command-list)

## undeafen

**Category:** admin

**Description:** Undeafen a user from voice channel

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** DEAFEN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, DEAFEN_MEMBERS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## unlockchannel

**Category:** admin

**Description:** Unlock A channel

**Usage:** `<channel mention | current channel>`

**Aliases:** N/A

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## unmute

**Category:** admin

**Description:** Unmute a user

**Usage:** `<@user>`

**Aliases:** N/A

**Member Permissions:** MANAGE_ROLES, MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## unset

**Category:** admin

**Description:** N/A

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## unsticky

**Category:** admin

**Description:** Sticky a message to the bottom of the screen

**Usage:** `N/A`

**Aliases:** `removesticky`

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES, MANAGE_MESSAGES, ADMINISTRATOR

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## voicekick

**Category:** admin

**Description:** voicekick or disconnect a user from a voice channel

**Usage:** `<user>`

**Aliases:** `disconnect`

**Member Permissions:** MOVE_MEMBERS

**Bot Permissions:** SEND_MESSAGES, MOVE_MEMBERS

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## voicemute

**Category:** admin

**Description:** voicemute a user

**Usage:** `<user>`

**Aliases:** N/A

**Member Permissions:** MUTE_MEMBERS

**Bot Permissions:** SEND_MESSAGES, MUTE_MEMBERS

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## voiceunmute

**Category:** admin

**Description:** unmute a user from voice channel

**Usage:** `<user>`

**Aliases:** N/A

**Member Permissions:** MUTE_MEMBERS

**Bot Permissions:** SEND_MESSAGES, MUTE_MEMBERS

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## warn

**Category:** admin

**Description:** Warns a user

**Usage:** `<user>`

**Aliases:** N/A

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## warnings

**Category:** admin

**Description:** Returns how many warnings a user has

**Usage:** `<user>`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `user(string)`

[Back to top](#ghostybot-command-list)

## calc

**Category:** util

**Description:** Calculate something

**Usage:** `N/A`

**Aliases:** `math`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `calculation(string)`

[Back to top](#ghostybot-command-list)

## givexp

**Category:** levels

**Description:** Give someone Xp

**Usage:** `<user> <amount>`

**Aliases:** N/A

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member(string)`, `amount(number)`

[Back to top](#ghostybot-command-list)

## leaderboard

**Category:** levels

**Description:** Shows top 10 users with the highest amount of XP

**Usage:** `N/A`

**Aliases:** `lb`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## level

**Category:** levels

**Description:** Get your current level

**Usage:** `N/A`

**Aliases:** `lvl`, `rank`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES, ATTACH_FILES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## resetxp

**Category:** levels

**Description:** reset all users xp for current server

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## xp

**Category:** levels

**Description:** Get xp from a user or yourself

**Usage:** `<user>`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## rradd

**Category:** reactions

**Description:** Add a reaction role

**Usage:** `<channel_id>`

**Aliases:** N/A

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES, ADD_REACTIONS, MANAGE_MESSAGES

**Required Arguments:** `channel_id(string)`

[Back to top](#ghostybot-command-list)

## rrremove

**Category:** reactions

**Description:** Add a reaction role

**Usage:** `<message_id>`

**Aliases:** `rrdel`, `rrr`, `rrdelete`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `message_id(string)`

[Back to top](#ghostybot-command-list)

## afk

**Category:** util

**Description:** N/A

**Usage:** `N/A`

**Aliases:** `setafk`, `makemeafk`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## avatar

**Category:** util

**Description:** Get user avatar

**Usage:** `N/A`

**Aliases:** `av`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## bmi

**Category:** util

**Description:** Calculate your BMI

**Usage:** `<weight in kilograms> <height in centimeters>`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `weight(number)`, `height(number)`

[Back to top](#ghostybot-command-list)

## botinvite

**Category:** util

**Description:** Returns the bot invite

**Usage:** `N/A`

**Aliases:** `botinv`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## bugreport

**Category:** util

**Description:** Report a bug to your staff

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `report(string)`

[Back to top](#ghostybot-command-list)

## channels

**Category:** util

**Description:** Shows all channels in the server

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## country

**Category:** util

**Description:** Get information about a country

**Usage:** `<country>`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `country(string)`

[Back to top](#ghostybot-command-list)

## covid

**Category:** util

**Description:** Get covid 19 information

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## ctgs

**Category:** util

**Description:** Create a shortened URL

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `slug(string)`, `url(string)`

[Back to top](#ghostybot-command-list)

## define

**Category:** util

**Description:** Define a word

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `word(string)`

[Back to top](#ghostybot-command-list)

## docs

**Category:** util

**Description:** Returns the request query from discord.js docs

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query(string)`

[Back to top](#ghostybot-command-list)

## emojis

**Category:** util

**Description:** Get a random color

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## enlarge

**Category:** util

**Description:** get your emoji enlarged

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `emoji(string)`

[Back to top](#ghostybot-command-list)

## feedback

**Category:** util

**Description:** Give feedback about the bot

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `message(string)`

[Back to top](#ghostybot-command-list)

## github

**Category:** util

**Description:** Search someone on github

**Usage:** `N/A`

**Aliases:** `gh`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `username(string)`

[Back to top](#ghostybot-command-list)

## help

**Category:** util

**Description:** Shows all commands Or shows more info about a command

**Usage:** `<category name | command name>`

**Aliases:** `h`, `info`, `commands`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES, ADD_REACTIONS

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## imdb

**Category:** util

**Description:** Get the information about series and movie

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query(string)`

[Back to top](#ghostybot-command-list)

## invite

**Category:** util

**Description:** Creates an instant invite for the server

**Usage:** `N/A`

**Aliases:** `inv`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES, CREATE_INSTANT_INVITE

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## ip

**Category:** util

**Description:** Search an IP

**Usage:** `N/A`

**Aliases:** `ip-lookup`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `ip(string)`

[Back to top](#ghostybot-command-list)

## minecraft

**Category:** util

**Description:** Get info about a minecraft server

**Usage:** `N/A`

**Aliases:** `mc`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `server-ip(string)`

[Back to top](#ghostybot-command-list)

## morse

**Category:** util

**Description:** Convert a string to morse code

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `text(string)`

[Back to top](#ghostybot-command-list)

## nasanews

**Category:** util

**Description:** Looks up an astronomy-related term on NASA's Website

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query(string)`

[Back to top](#ghostybot-command-list)

## npm

**Category:** util

**Description:** Search packages on npm by their name

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query(string)`

[Back to top](#ghostybot-command-list)

## pastebin

**Category:** util

**Description:** Get a link of pastebin for your text

**Usage:** `<extension (js, ts, ...)> <code>`

**Aliases:** `paste`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `extension(string)`, `code(string)`

[Back to top](#ghostybot-command-list)

## playstore

**Category:** util

**Description:** Show Playstore Application Information Of Your Given Name!

**Usage:** `<Application Name>`

**Aliases:** `ps`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `app(string)`

[Back to top](#ghostybot-command-list)

## pokemon

**Category:** util

**Description:** Returns a pokémon information

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query(string)`

[Back to top](#ghostybot-command-list)

## poll

**Category:** util

**Description:** Create a poll

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `question(string)`

[Back to top](#ghostybot-command-list)

## randomcolor

**Category:** util

**Description:** Get a random color

**Usage:** `N/A`

**Aliases:** `color`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## roleinfo

**Category:** util

**Description:** Shows info about a role

**Usage:** `N/A`

**Aliases:** `role`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `role(string)`

[Back to top](#ghostybot-command-list)

## roles

**Category:** util

**Description:** Shows all roles from the guild

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## servericon

**Category:** util

**Description:** Shows the server icon

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## skin

**Category:** util

**Description:** Search for skins from Minecraft

**Usage:** `N/A`

**Aliases:** `minecraftskin`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `username(string)`

[Back to top](#ghostybot-command-list)

## spotify

**Category:** util

**Description:** Find a track/artist/album via the Spotify API

**Usage:** `N/A`

**Aliases:** `spot`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `track/artist/album/playlist(string)`, `search query(string)`

[Back to top](#ghostybot-command-list)

## suggest

**Category:** util

**Description:** Create a suggestion

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `suggestion(string)`

[Back to top](#ghostybot-command-list)

## translate

**Category:** util

**Description:** Translate a sentence

**Usage:** `<language> <sentence>`

**Aliases:** `tr`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `language(string)`, `text(string)`

[Back to top](#ghostybot-command-list)

## uptime

**Category:** util

**Description:** Returns the uptime of the bot

**Usage:** `N/A`

**Aliases:** `up`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## verify

**Category:** util

**Description:** Verify yourself to get guild access

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

[Back to top](#ghostybot-command-list)

## weather

**Category:** util

**Description:** See the weather in a country/city

**Usage:** `N/A`

**Aliases:** N/A

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `country/city(string)`

[Back to top](#ghostybot-command-list)

## web

**Category:** util

**Description:** Returns a screenshot of the requested website

**Usage:** `<url EG: https://google.com >`

**Aliases:** `screenshot`, `webscreenshot`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES, ATTACH_FILES

**Required Arguments:** `url(string)`

[Back to top](#ghostybot-command-list)

## wiki

**Category:** util

**Description:** Search something up on Wikipedia

**Usage:** `N/A`

**Aliases:** `wikipediasearch`, `wikipedia`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query(string)`

[Back to top](#ghostybot-command-list)
