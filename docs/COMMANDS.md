# Ghostybot Command list

  This command list was automatically generated in [this file](https://github.com/Dev-CasperTheGhost/ghostybot/tree/main/src/scripts/generateCommandList.js).
  GhostyBot has a total of 203 commands
  
  ## addcmd

**Category:** admin

**Description:** add guild custom commands

**Usage:** `addcmd <cmd_name> <cmd_response>`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name`, `command response`

## addrole

**Category:** admin

**Description:** Add a role to a user

**Usage:** `N/A`

**Member Permissions:** SEND_MESSAGES, MANAGE_ROLES, ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `member`, `role`

## addroleall

**Category:** admin

**Description:** Add a role to all user of the current server

**Usage:** `N/A`

**Member Permissions:** MANAGE_ROLES, ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `role`

## announce

**Category:** admin

**Description:** Announce something in a channel

**Usage:** `announce <channel> <text>`

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## ban

**Category:** admin

**Description:** ban

**Usage:** `N/A`

**Member Permissions:** BAN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, BAN_MEMBERS

**Required Arguments:** N/A

## blacklistedwords

**Category:** admin

**Description:** Add/remove blacklisted words

**Usage:** `N/A`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## config

**Category:** exempt

**Description:** Returns the config

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## createrole

**Category:** admin

**Description:** This command creates a role with the name of what you say

**Usage:** `N/A`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `role name`

## ctopic

**Category:** admin

**Description:** Update the channel topic

**Usage:** `N/A`

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

## deafen

**Category:** admin

**Description:** Deafen a user

**Usage:** `N/A`

**Member Permissions:** DEAFEN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, DEAFEN_MEMBERS

**Required Arguments:** `member`, `reason`

## delcmd

**Category:** admin

**Description:** Delete the custom commannd

**Usage:** `delcmd <cmd_name>`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name`

## delete

**Category:** admin

**Description:** Delete message, up to 100

**Usage:** `delete <1-100>`

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES, MANAGE_MESSAGES

**Required Arguments:** `amount`

## disable

**Category:** exempt

**Description:** Disables a command

**Usage:** `N/A`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name | category name`

## enable

**Category:** exempt

**Description:** Enables a command

**Usage:** `N/A`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `command name | category name`

## ignoredchannels

**Category:** admin

**Description:** Add/remove ignored channels

**Usage:** `set <option> <channel>`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## kick

**Category:** admin

**Description:** Kick a user

**Usage:** `N/A`

**Member Permissions:** KICK_MEMBERS

**Bot Permissions:** SEND_MESSAGES, KICK_MEMBERS

**Required Arguments:** N/A

## lockchannel

**Category:** admin

**Description:** Lock A channel

**Usage:** `N/A`

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

## mute

**Category:** admin

**Description:** Mute a user

**Usage:** `mute <@user>`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES, MANAGE_CHANNELS

**Required Arguments:** N/A

## nuke

**Category:** admin

**Description:** Nuke the current channel, delete all messages of the channel

**Usage:** `nuke`

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

## prefix

**Category:** exempt

**Description:** Set a prefix for your server

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## removerole

**Category:** admin

**Description:** Remove a role from a user

**Usage:** `N/A`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `member`, `role`

## removeroleall

**Category:** admin

**Description:** remove a role from all user of the current server

**Usage:** `N/A`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** `role`

## removeuserwarns

**Category:** admin

**Description:** Remove all warns from a user

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`

## say

**Category:** admin

**Description:** Let the bot say something

**Usage:** `N/A`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## set

**Category:** admin

**Description:** Set a default channel

**Usage:** `set <option> <channel>`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## setwelcomemsg

**Category:** admin

**Description:** Sets the welcome msg

**Usage:** `N/A`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## stealemoji

**Category:** admin

**Description:** Steal an emoji from a different server

**Usage:** `stealemoji <emoji> <custom name>`

**Member Permissions:** MANAGE_EMOJIS

**Bot Permissions:** SEND_MESSAGES, MANAGE_EMOJIS

**Required Arguments:** N/A

## sticky

**Category:** admin

**Description:** Sticky a message to the bottom of the screen

**Usage:** `N/A`

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES, MANAGE_MESSAGES

**Required Arguments:** `message`

## tempmute

**Category:** admin

**Description:** Temporary mute someone

**Usage:** `tempmute <user> <time> <reason>`

**Member Permissions:** MANAGE_ROLES

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES, MANAGE_CHANNELS

**Required Arguments:** N/A

## unban

**Category:** admin

**Description:** unban a user by their id

**Usage:** `N/A`

**Member Permissions:** BAN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, BAN_MEMBERS

**Required Arguments:** `member_id`

## undeafen

**Category:** admin

**Description:** Undeafen a user from voice channel

**Usage:** `N/A`

**Member Permissions:** DEAFEN_MEMBERS

**Bot Permissions:** SEND_MESSAGES, DEAFEN_MEMBERS

**Required Arguments:** N/A

## unlockchannel

**Category:** admin

**Description:** Unlock A channel

**Usage:** `unlockchannel <channel mention | current channel>`

**Member Permissions:** MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_CHANNELS

**Required Arguments:** N/A

## unmute

**Category:** admin

**Description:** Unmute a user

**Usage:** `unmute <@user>`

**Member Permissions:** MANAGE_ROLES, MANAGE_CHANNELS

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES

**Required Arguments:** N/A

## unset

**Category:** admin

**Description:** Unset/disable an option

**Usage:** `unset <option>`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## unsticky

**Category:** admin

**Description:** Sticky a message to the bottom of the screen

**Usage:** `N/A`

**Member Permissions:** MANAGE_MESSAGES

**Bot Permissions:** SEND_MESSAGES, MANAGE_MESSAGES, ADMINISTRATOR

**Required Arguments:** N/A

## voicekick

**Category:** admin

**Description:** voicekick or disconnect a user from a voice channel

**Usage:** `N/A`

**Member Permissions:** MOVE_MEMBERS

**Bot Permissions:** SEND_MESSAGES, MOVE_MEMBERS

**Required Arguments:** N/A

## voicemute

**Category:** admin

**Description:** voicemute a user

**Usage:** `N/A`

**Member Permissions:** MUTE_MEMBERS

**Bot Permissions:** SEND_MESSAGES, MUTE_MEMBERS

**Required Arguments:** N/A

## voiceunmute

**Category:** admin

**Description:** unmute a user from voice channel

**Usage:** `N/A`

**Member Permissions:** MUTE_MEMBERS

**Bot Permissions:** SEND_MESSAGES, MUTE_MEMBERS

**Required Arguments:** N/A

## warn

**Category:** admin

**Description:** Warns a user

**Usage:** `N/A`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## warnings

**Category:** admin

**Description:** Returns how many warnings a user has

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## alpaca

**Category:** animal

**Description:** Shows a picture of a alpaca

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## bear

**Category:** animal

**Description:** Shows a random picture of bear and fact

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## bird

**Category:** animal

**Description:** Returns an image of a bird

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## bunny

**Category:** animal

**Description:** Shows a picture of a bunny

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## camel

**Category:** animal

**Description:** Shows a picture of a camel

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## cat

**Category:** animal

**Description:** Shows a picture of a cat

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## catfact

**Category:** animal

**Description:** Returns a cat fact

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## cow

**Category:** animal

**Description:** Returns a cow ascii

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## cowsay

**Category:** animal

**Description:** Let a cow say something

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## dog

**Category:** animal

**Description:** Shows a picture of a dog

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## dogfact

**Category:** animal

**Description:** Returns a dog fact

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## duck

**Category:** animal

**Description:** Shows a picture of a duck

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## fox

**Category:** animal

**Description:** Shows a picture of a fox

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## koala

**Category:** animal

**Description:** Shows a random picture of koala

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## lizard

**Category:** animal

**Description:** Shows a picture of a lizard

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## llama

**Category:** animal

**Description:** Shows a picture of a llama

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## owl

**Category:** animal

**Description:** Shows a picture of a owl

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## panda

**Category:** animal

**Description:** Shows a picture of a panda

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## racoon

**Category:** animal

**Description:** Shows an image of a raccoon

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## shibe

**Category:** animal

**Description:** Returns an image of a shibe

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## snailfact

**Category:** animal

**Description:** Returns a snail fact

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## whale

**Category:** animal

**Description:** Shows an image of a whale

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## blacklist

**Category:** botowner

**Description:** Remove/add blacklist from a user

**Usage:** `blacklist <option> <level> <user>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## eval

**Category:** botowner

**Description:** Eval

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## leaveguild

**Category:** botowner

**Description:** Leaves a guid by the provided Id

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## nickname

**Category:** botowner

**Description:** Set the bot's nick name in a guild

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## reload

**Category:** botowner

**Description:** Reloads a command

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## shutdown

**Category:** botowner

**Description:** Shuts the bot down

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## addmoney

**Category:** economy

**Description:** Add money to a user

**Usage:** `N/A`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`, `amount`

## balance

**Category:** economy

**Description:** balance

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## buy

**Category:** economy

**Description:** Buy an item from the store

**Usage:** `buy <item name>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `item name`

## daily

**Category:** economy

**Description:** daily

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## deposit

**Category:** economy

**Description:** deposit money to your bank

**Usage:** `!deposit <all | amount>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `amount`

## dice

**Category:** economy

**Description:** Roll a dice

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## inventory

**Category:** economy

**Description:** View your or a user inventory

**Usage:** `inventory <user>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## moneyleaderboard

**Category:** economy

**Description:** Returns a leaderboard with the top 10 users money

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## pay

**Category:** economy

**Description:** Give money to a user

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`, `amount`

## profile

**Category:** economy

**Description:** See the full profile of a user

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## removemoney

**Category:** economy

**Description:** Remove money to a user

**Usage:** `N/A`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`, `amount`

## rob

**Category:** economy

**Description:** Rob up to 1000coins from somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`, `amount`

## slots

**Category:** economy

**Description:** Slots machine

**Usage:** `slots <amount>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## store

**Category:** economy

**Description:** View the store/shop to buy something

**Usage:** `store <option | no-args>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## weekly

**Category:** economy

**Description:** Collect your weekly price

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## withdraw

**Category:** economy

**Description:** Withdraw money to your bank

**Usage:** `withdraw <all | amount>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `amount`

## work

**Category:** economy

**Description:** work

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## 8ball

**Category:** games

**Description:** 8Ball

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## advice

**Category:** games

**Description:** Gives you advice

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## ascii

**Category:** games

**Description:** Transform text to ascii

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## bet

**Category:** games

**Description:** Bet on somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## block

**Category:** games

**Description:** Write text with blocks

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## calc

**Category:** games

**Description:** Calculate something

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## compliment

**Category:** games

**Description:** Get a compliment

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## dadjoke

**Category:** games

**Description:** Shows a dadjoke

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## flipcoin

**Category:** games

**Description:** Flip a coin

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## foodporn

**Category:** games

**Description:** Shows Food images

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## happiness

**Category:** games

**Description:** Get a happiness returned

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## iq

**Category:** games

**Description:** Get a random Iq returned

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## lmgtfy

**Category:** games

**Description:** Let me google that for you

**Usage:** `lmgtfy <search query>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## meme

**Category:** games

**Description:** Returns a meme

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## ping

**Category:** games

**Description:** pong!

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## randomjoke

**Category:** games

**Description:** returns a random joke

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## randomnumber

**Category:** games

**Description:** Returns a random 6 digit number

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## rps

**Category:** games

**Description:** Rock Paper Scissors

**Usage:** `rps <rock | paper | scissors>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `rock | paper | scissors`

## tictactoe

**Category:** games

**Description:** Play a game of tictactoe

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`

## wyr

**Category:** games

**Description:** Would you rather

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## givend

**Category:** giveaway

**Description:** Ends a giveaway

**Usage:** `givend <messageId> 
 **Example:** !giveaway end <messageId>`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## givreroll

**Category:** giveaway

**Description:** Reroll a giveaway

**Usage:** `N/A`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## givstart

**Category:** giveaway

**Description:** Starts a giveaway

**Usage:** `givstart <time> <winner count> <price>
 **Example:** !givstart 2d 10 Discord nitro`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## hanal

**Category:** hentainsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## hass

**Category:** hentainsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## hboobs

**Category:** hentainsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## hentai

**Category:** hentainsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## neko

**Category:** hentainsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## amazeme

**Category:** image

**Description:** Shows interesting images or facts

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## amazingearth

**Category:** image

**Description:** Amazing images of light and landscape

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## baka

**Category:** image

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## changemymind

**Category:** image

**Description:** Change my mind

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## clyde

**Category:** image

**Description:** Let clyde say something

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## cuddle

**Category:** image

**Description:** Cuddle with somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## feed

**Category:** image

**Description:** feed somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## giphy

**Category:** image

**Description:** Return a giphy image

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## hug

**Category:** image

**Description:** Shows a picture of people hugging

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## imgfy

**Category:** image

**Description:** text to image converter xD

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## kiss

**Category:** image

**Description:** Shows a picture of people kissing

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## owo

**Category:** image

**Description:** OwO

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## pat

**Category:** image

**Description:** Pat somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## poke

**Category:** image

**Description:** Poke somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## slap

**Category:** image

**Description:** Slap somebody

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## smug

**Category:** image

**Description:** Smug

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## supreme

**Category:** image

**Description:** Display custom text as the Supreme logo

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## tweet

**Category:** image

**Description:** Returns an image with your tweet

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## givexp

**Category:** levels

**Description:** Give someone Xp

**Usage:** `givexp <user> <amount>`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `member`, `amount`

## leaderboard

**Category:** levels

**Description:** Shows top 10 users with the highest amount of XP

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## level

**Category:** levels

**Description:** Get your current level

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## resetxp

**Category:** levels

**Description:** reset all users xp for current server

**Usage:** `resetxp all`

**Member Permissions:** MANAGE_GUILD

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## xp

**Category:** levels

**Description:** Get Xp from mentioned user or yourself

**Usage:** `xp <user>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## clearqueue

**Category:** music

**Description:** Clear the music playlist

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## nowplaying

**Category:** music

**Description:** Shows info about the current playing song

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## pause

**Category:** music

**Description:** Pause a song that is playing

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## play

**Category:** music

**Description:** Play a song

**Usage:** `play <youtube link | song name>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `song`

## queue

**Category:** music

**Description:** Show top 20 songs in the queue

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## resume

**Category:** music

**Description:** Resume a song that was playing

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## shuffle

**Category:** music

**Description:** Shuffle the queue

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## skip

**Category:** music

**Description:** Skip a song that is playing

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## stop

**Category:** music

**Description:** stop

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## volume

**Category:** music

**Description:** Set the volume between 1 to 100

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## 4k

**Category:** nsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## anal

**Category:** nsfw

**Description:** anal nsfw

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## blowjob

**Category:** nsfw

**Description:** N/A

**Usage:** `None`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## boobs

**Category:** nsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## butt

**Category:** nsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## gif

**Category:** nsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## gonewild

**Category:** nsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## pussy

**Category:** nsfw

**Description:** None

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## spank

**Category:** nsfw

**Description:** N/A

**Usage:** `None`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## wallpaper

**Category:** nsfw

**Description:** good wallpapers xD

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## rradd

**Category:** reactions

**Description:** Add a reaction role

**Usage:** `rradd <channel_id>`

**Member Permissions:** ADMINISTRATOR

**Bot Permissions:** SEND_MESSAGES, MANAGE_ROLES, ADD_REACTIONS, MANAGE_MESSAGES

**Required Arguments:** `channel_id`

## rrremove

**Category:** reactions

**Description:** Add a reaction role

**Usage:** `rrremove <message_id>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `message_id`

## removereminder

**Category:** reminder

**Description:** Remove your current reminder

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## setreminder

**Category:** reminder

**Description:** Set a reminder, the bot will ping you when the timer runs out

**Usage:** `setreminder <time> <message>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `time`, `message`

## afk

**Category:** util

**Description:** N/A

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## anime

**Category:** util

**Description:** description

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `name`

## avatar

**Category:** util

**Description:** Get user avatar

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## bmi

**Category:** util

**Description:** Calculate your BMI

**Usage:** `bmi <weight in kilograms> <height in centimeters>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `weight`, `height`

## botinfo

**Category:** util

**Description:** Shows info about the bot

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## botinvite

**Category:** util

**Description:** Returns the bot invite

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## bugreport

**Category:** util

**Description:** Report a bug to your staff

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `report`

## channelinfo

**Category:** util

**Description:** Get information about a channel

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## channels

**Category:** util

**Description:** Shows all channels in the server

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## covid

**Category:** util

**Description:** Get covid 19 information

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## define

**Category:** util

**Description:** Define a word

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `word`

## dependencies

**Category:** util

**Description:** Shows a list of all bots dependencies

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## docs

**Category:** util

**Description:** Returns the request query from discord.js docs

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query`

## emojis

**Category:** util

**Description:** Get a random color

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## enlarge

**Category:** util

**Description:** get your emoji enlarged

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `emoji`

## feedback

**Category:** util

**Description:** Give feedback about the bot

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `message`

## github

**Category:** util

**Description:** Search someone on github

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `username`

## hastebin

**Category:** util

**Description:** Get a link of hastebin for your text

**Usage:** `hastbin <extension (js, ts, ...)> <code>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `extension`, `code`

## help

**Category:** util

**Description:** Shows all commands Or shows more info about a command

**Usage:** `h <category name | command name>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## image

**Category:** util

**Description:** Search any image you want from google

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## imdb

**Category:** util

**Description:** Get the information about series and movie

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query`

## invite

**Category:** util

**Description:** Get a random color

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES, CREATE_INSTANT_INVITE

**Required Arguments:** N/A

## membercount

**Category:** util

**Description:** N/A

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## minecraft

**Category:** util

**Description:** Get info about a minecraft server

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `server-ip`

## morse

**Category:** util

**Description:** Convert a string to morse code

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query`

## npm

**Category:** util

**Description:** Search packages on npm by their name

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query`

## playstore

**Category:** util

**Description:** Show Playstore Application Information Of Your Given Name!

**Usage:** `playstore <Application Name>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `app`

## pokemon

**Category:** util

**Description:** Returns a pokemon information

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query`

## poll

**Category:** util

**Description:** Create a poll

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `question`

## randomcolor

**Category:** util

**Description:** Get a random color

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## roleinfo

**Category:** util

**Description:** Shows info about a role

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `role`

## roles

**Category:** util

**Description:** Shows all roles from the guild

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## servericon

**Category:** util

**Description:** Shows the server icon

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## serverinfo

**Category:** util

**Description:** Get info about the server

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## skin

**Category:** util

**Description:** Search for skins from Minecraft

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `username`

## spotify

**Category:** util

**Description:** Shows status of users

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## suggest

**Category:** util

**Description:** Create a suggestion

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `suggestion`

## translate

**Category:** util

**Description:** Translate a sentence

**Usage:** `!translate <language> <sentence>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `language`, `sentence`

## uptime

**Category:** util

**Description:** Returns the uptime of the bot

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## userinfo

**Category:** util

**Description:** Get user info

**Usage:** `!userinfo <user>`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

## weather

**Category:** util

**Description:** See the weather in a country/city

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `country/city`

## wiki

**Category:** util

**Description:** Search something up on Wikipedia

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** `query`

## worldclock

**Category:** util

**Description:** Shows the time from other countries

**Usage:** `N/A`

**Member Permissions:** None

**Bot Permissions:** SEND_MESSAGES

**Required Arguments:** N/A

  