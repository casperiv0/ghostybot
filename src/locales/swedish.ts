const LANG: typeof import("./english").default = {
  GLOBAL: {
    EVERYONE: "Everyone",
    NOT_SPECIFIED: "Ej angivet",
    ERROR: "Ett fel uppstod",
    NAME: "Namn",
    SUCCESS: "Framgång!",
    REASON: "Anledning",
    URL: "URL",
    NONE: "Ingen",
    YES: "Ja",
    NO: "Neh",
  },
  GUILD: {
    NOT_FOUND: "Guild hittades inte",
    LEFT: "Framgångsrikt lämnat guild **${guild_name}**",
    OWNER: "Guildägare",
    CHANNEL_C: "Kanalantal",
    EMOJI_C: "Emoji räkna",
    ROLES_C: "Roll räkna",
    MEMBER_C: "Medlem räkna",
    REGION: "Område",
    VERIFICATION: "Verifieringsnivå",
    MFA: "MFA-nivå",
  },
  MEMBER: {
    BANNER: "Banner",
    TAG: "Tagg",
    ROLES: "Roller",
    BADGES: "Badges",
    ONLINE: "Uppkopplad",
    OFFLINE: "Off-line",
    STATUS: "Status",
    CREATED_ON: "Skapad på",
    JOINED_AT: "Gick med på",
    NICKNAME: "Smeknamn",
    NOT_FOUND: "Medlem hittades inte",
    CANNOT_BE_BANNED: "Denna medlem kan inte förbjudas",
    DM_BAN_MESSAGE:
      "Du har blivit **förbjudna** från **{guild_name}**, Anledning: **{ban_reason}**",
    GUILD_BAN_MESSAGE:
      "{member} förbjöds framgångsrikt från servern. Anledning: **{ban_reason}**. Jag har också skickat en DM som meddelar personen.",
    BOT_DATA: "Bot data does not save, therefore I cannot fetch his data",
    PERMISSIONS: "Permissions",
  },
  ROLES: {
    MY_ROLE_NOT_HIGH_ENOUGH: "Min roll är inte tillräckligt hög än **{role}** roll!",
    MY_ROLE_MUST_BE_HIGHER: "Min roll måste vara högre än **{member}** högsta roll!",
    ALREADY_HAS_ROLE: "Den medlemmen har redan den rollen",
    ADDED_ROLE_TO: "har lagts till **{role}** till {member}",
  },
  IMAGE: {
    CLICK_TO_VIEW: "[Klicka här om bilden inte kunde laddas.]",
    CLYDE: "Clyde",
    CUDDLES: "kramar med",
    FEEDED: "matas",
    HUGGED: "kramade",
    PATTED: "klappade",
    KISSED: "kysste",
    POKED: "stötte",
    SLAPPED: "slog",
    NO_GIPHY_KEY: "No giphy api was found in the config (contact the bot owner)",
    NO_GPIHY_FOUND: "No gifs were found with that",
  },
  BOT_OWNER: {
    EVAL: "Eval-kommando",
    EVAL_TYPE: "Typ",
    EVAL_INPUT: "Inmatning",
    EVAL_OUTPUT: "Produktion",
    CANNOT_BL_OWNER: "Det går inte att svartlista ägaren",
    NOT_BLD: "Användaren är inte svartlistad",
    ALREADY_BLD: "{member} är redan svartlistad",
    NOT_OPTION: "**{type}** är inte ett alternativ",
    BLACKLISTED: "svartlistad",
    UNBLACKLISTED: "osvartlistad",
    BLACKLISTED_SUCCESS: "{member} var {type}",
    CANNOT_BL_BOT: "The bot cannot be blacklisted",
  },
  LEVELS: {
    XP: "XP",
    LEVEL: "Nivå",
    LEADERBOARD: "Leaderboard",
    GIVE_XP_SUCCESS: "SFramgångsrikt gav **{member}** **{amount}**XP",
    TOTAL_XP: "Total XP",
    NEW_LEVEL: "New level",
    LEVEL_UP: "Level Up!",
    REMOVED_XP: "Successfully removed **{amount}**XP from **{userTag}**",
  },
  PERMISSIONS: {
    CREATE_INSTANT_INVITE: "Create invites",
    KICK_MEMBERS: "Kick members",
    BAN_MEMBERS: "Ban members",
    ADMINISTRATOR: "Administrator",
    MANAGE_CHANNELS: "Manage channels",
    MANAGE_GUILD: "Manage server",
    ADD_REACTIONS: "Add reactions",
    VIEW_AUDIT_LOG: "View audit logs",
    PRIORITY_SPEAKER: "Use Priority speaker",
    STREAM: "Go live",
    VIEW_CHANNEL: "View channel",
    SEND_MESSAGES: "Send messages",
    SEND_TTS_MESSAGES: "Send TTS-messages",
    MANAGE_MESSAGES: "Manage messages",
    EMBED_LINKS: "Embed links",
    ATTACH_FILES: "Attach files",
    READ_MESSAGE_HISTORY: "Read message history",
    MENTION_EVERYONE: "Mention everyone",
    USE_EXTERNAL_EMOJIS: "Use external emojis",
    VIEW_GUILD_INSIGHTS: "View server insights",
    CONNECT: "Join voice",
    SPEAK: "Speak in voice",
    MUTE_MEMBERS: "Mute members",
    DEAFEN_MEMBERS: "Deafen members",
    MOVE_MEMBERS: "Move members",
    USE_VAD: "Use voice activity detection",
    CHANGE_NICKNAME: "Change nickname",
    MANAGE_NICKNAMES: "Manage nicknames",
    MANAGE_ROLES: "Manage roles",
    MANAGE_WEBHOOKS: "Manage webhooks",
    MANAGE_EMOJIS: "Manage emojis",
    REQUEST_TO_SPEAK: "Request to speak",
    USE_APPLICATION_COMMANDS: "Use application commands",
    STAGE_MODERATOR: "Stage Moderator",
    MANAGE_EMOJIS_AND_STICKERS: "Manage emojis and stickers",
    MANAGE_THREADS: "Manage threads",
    USE_PUBLIC_THREADS: "Use public threads",
    USE_PRIVATE_THREADS: "Use private threads",
    USE_EXTERNAL_STICKERS: "Use external stickers",
  },
  MUSIC: {
    MUST_BE_IN_VC: "Du måste vara i en röstkanal",
    BOT_NOT_IN_VC: "Bot is not in this voice channel!",
    NO_QUEUE: "Det finns inga låtar för närvarande",
    QUEUE_CLEARED: "Kön rensades",
    QUEUE: "Musik kö",
    BETWEEN_0_100: "Volymen måste vara mellan 0 och 100",
    VOL_SUCCESS: "Ställ in volymen till {vol}%",
    BETWEEN_1_TOTALQUEUE: "Use a track number between 1 and {totalQueue}",
    REMOVE_SUCCESS: "has been removed from the queue",
    PLAYING: "Spelar",
    PAUSED: "Paused",
    DURATION: "Varaktighet",
    ADDED_TO_QUEUE: "Sång har lagts till i kön | {songs} låtar i kö",
    ADDED_TO_QUEUE2: "Song has been added to the queue",
    ADDED_PL_TO_QUEUE: "Playlist: {name} was added to queue ({length} songs)",
    NOW_PLAYING: "Nu spelas:",
    REQUESTED_BY: "Efterfrågad av {user}",
    NO_PERMS: "Jag har inte rätt behörighet för den röstkanalen!",
    NO_RESULTS: "Inga låtar hittades",
    SUC_REM_FILTER: "Successfully removed {filter}",
    SUC_APPLIED_FILTER: "Successfully applied {filter}",
    FILTER_NOT_FOUND: "That filter was not found",
    FILTER_ALREADY_ENABLED: "Filter `{filter}` is already enabled",
    FILTER_NOT_ENABLED: "Filter `{filter}` is not enabled?",
    NOT_VALID_OPTION: "{option} Is not a valid option `set`, `remove`",
    NO_LYRICS: "No lyrics found for {songTitle}.",
    NOW: "Now",
    MUSIC_STARTING: "The music is starting. Please wait a few seconds..",
    INFORMATION: "Information",
    UPLOADER: "Uploader",
    LIKES: "Likes",
    ERRORS: {
      LIVE_NOT_SUPPORTED: "Live videos are not supported",
      JOIN_ERROR: "There was an error joining the voice channel, make sure it's not full!",
      NO_RESULT: "No songs were found.",
      VOICE_FULL: "That voice channel is full.",
      NO_QUEUE: "There's no music playing.",
      NO_PREVIOUS: "There is no previous song in the queue.",
      NO_UP_NEXT: "There is no next song in the queue.",
      UNAVAILABLE_VIDEO: "That video/playlist seems to be unavailable.",
      NOT_SUPPORTED_URL: "That URL is not supported.",
      NON_NSFW: "Cannot play age-restricted content in non-NSFW channel.",
      UNPLAYABLE_FORMATS: "That format cannot be used.",
      NO_SONG_POSITION: "There isn't a song at this position in the queue.",
      EMPTY_PLAYLIST: "There isn't a valid song in the playlist",
    },
  },
  ECONOMY: {
    MONEY: "Pengar",
    BANK: "Bank",
    BALANCE: "Balans",
    DAILY_ERROR: "Вы уже забрали свой ежедневный бонус! Возвращайтесь {time}",
    WEEKLY_ERROR: "Вы уже забрали свой еженедельный бонус! Возвращайтесь {time}",
    DAILY_SUCCESS: "Du samlade ditt dagliga **{amount}** mynt",
    WEEKLY_SUCCESS: "Du har samlat in din veckovis **{amount}** mynt",
    STORE_EMPTY:
      "There are no items in the store! Ask an admin to add items to the store via the dashboard.",
    PROVIDE_ITEM_TO_BUY: "Vänligen ange en artikel att köpa",
    NOT_ENOUGH_MONEY: "Du har inte så mycket pengar",
    BUY_SUCCESS: "Framgångsrikt köpt **{item}** betalas **{price}**",
    NOT_FOUND_STORE: "**{query}** wasn't found in the store.",
    ALREADY_OWN_ITEM: "Du äger redan det här föremålet",
    DEPOSITED_ALL: "Har deponerat alla dina pengar!",
    DEPOSITED_AMOUNT: "Har deponerats framgångsrikt **{amount} mynt**",
    WITHDRAW_ALL: "Lyckades tillbaka alla dina pengar!",
    WITHDRAW_AMOUNT: "Sframgångsrikt återkallad **{amount} mynt**",
    PROFILE: "Profil",
    INV_EMPTY: "Användarens inventering är tom",
    INVENTORY: "Lager",
    INV_ITEMS: "Lagerartiklar",
    VIEW_INVENTORY: "Använda `{prefix}inventory <user>` för att se deras lagervaror.",
    MONEY_LEADERBOARD: "Topplista för pengar",
    TOTAL_BALANCE: "Total balans",
    BOTH_COUNTED: "Bank och pengar räknades båda",
    DICE_LANDED: "Du landade på: {roll}",
    DICE_WON: "grattis! Du vann ett pris på **{price}mynt**",
    DICE_LOST: "Du måste landa en **6** för att få ett pris på **{price}mynt**",
    RECENTLY_WORKED: "Du har redan arbetat nyligen, {time} återstående",
    WORKED: "{member} arbetat som en **{job_name}** och tjänat **{amount}**!",
    CANNOT_PAY_SELF: "Du kan inte betala själv",
    PAY_SUCCESS: "Framgångsrikt gav **{member}** **{amount}mynt**",
    CANNOT_ROB_SELF: "Du kan inte råna dig själv!",
    BETWEEN_1_1000: "Beloppet måste vara mellan 1 och 1000",
    MEMBER_NO_MONEY: "Användaren har inga pengar, därför kan du inte råna den här användaren.",
    ROB_SUCCESS: "Rånat framgångsrikt **{amount}mynt** från **{member}**",
    STORE: "butiken",
    MANAGE_STORE_PERMS: "Du har inte rätt behörighet att hantera butiken! (Hantera server)",
    PROVIDE_VALID_ITEM: "Vänligen ange ett giltigt objekt till add/remove!",
    PRICE: "Price",
    ALREADY_EXISTS: "**{item}** finns redan i butiken!",
    PROVIDE_PRICE: "Ange ett pris för artikeln!",
    MUST_BE_NUMBER: "Priset måste vara ett nummer!",
    ADDED_TO_STORE: "{item} lades till i affären!",
    NOT_IN_STORE: "**{item}** finns inte i butiken!",
    REMOVED_FROM_STORE: "{item} togs bort från affären!",
    WON_SLOTS: "Du vann och fick {amount} mynt",
    LOST_SLOTS: "Du förlorade!",
    MAX_BET: "max bet amount is 500",
    ADDED_MONEY: "Successfully added {amount} to user balance",
    MIN_BET: "Minimum bet of 1 is required",
    MIN_AMOUNT: "Amount must be above 0",
    RESET_CONF: "Reset all balance? y/n",
    RESET_SUCCESS: "Successfully reset everyone's balance",
    RESET_CANCEL: "reset-economy was canceled",
    PROVIDE_AMOUNT: "Please provide an amount to withdraw",
    NO_MONEY: "You don't have that much money in your bank!",
    WORK: "Work!",
    REMOVED_MONEY: "Successfully removed {amount} from user balance",
    ALREADY_WORKED: "You have already worked recently. Check back {time}",
  },
  GAMES: {
    BETS_ON: "{member_1} satsar på {member_2}",
    LOST_BET: "{member_1} satsar på {member_2}!\n {member_1} vann inte vadet",
    WON_BET: "{member_1} satsar på {member_2} och {member_1} vann inte vadet",
    CALC: "Kalkylator",
    INVALID_CALC: "Ogiltig beräkning",
    COMPLIMENT: "Komplimang",
    LANDED_TAILS: "Du landade på Tails",
    LANDED_HEADS: "Du landade på Heads",
    HAPPINESS: "Lycka",
    IQ_TEST: "IQ Test",
    IQ_IS: "Din IQ är: {iq}",
    RPS: "Sten sax påse",
    ROCK: "Sten",
    PAPER: "påse",
    SCISSORS: "sax",
    WYR: "Skulle du hellre?",
    ANSWER: "Svar",
    QUESTION: "Fråga",
    YOU_WON: "You won 50coins!",
    BOT_WON: "The bot has won!",
    BOTH_WON: "It's a tie",
    OPPONENTS_CHOICE: "Opponents choice",
    YOUR_CHOICE: "Your choice",
    WINNER: "Winner",
    INVALID_INPUT: "Input must be 1 of the following:",
    QUOTE: "Quote",
    TAGS: "Tags",
    VOTES: "Votes",
    WYR_QUESTIONS: "{question1} **OR** {question2}",
  },
  UTIL: {
    TEXT_NOT_SUP: "That text is not supported",
    AVATAR: "Avatar",
    NOT_AFK: "Du är inte afk längre",
    AFK: "Du är nu afk",
    BMI_WEIGHT: "Vikt",
    BMI_HEIGHT: "Höjd",
    BMI: "BMI",
    SUPPORT_SERVER: "Support server",
    BUG_REPORT: "{member} har rapporterat ett fel",
    BUG_REPORTED: "Felrapporten skickades!",
    CHANNEL_TOPIC: "Kanalämne",
    NO_DEF_FOUND: "Ingen definition hittades för {word}",
    DEF_FOR_WORD: "Definition för {word}",
    CATEGORY: "Kategori",
    DEFINITION: "Definition",
    ANIMATED: "Animerad",
    NON_ANIMATED: "inte Animerad",
    NEW_FEEDBACK: "Ny Respons",
    FEEDBACK_SEND: "Skicka feedback framgångsrikt!",
    GH_NOT_FOUND: "GitHub-kontot hittades inte",
    GH_FOLLOWING: "Följer",
    GH_FOLLOWERS: "Följare",
    GH_WEBSITE: "Webside",
    GH_LOCATION: "Plats",
    GH_BIO: "Bio",
    DB_RATINGS: "Betyg",
    DB_COUNTRY: "Land",
    DB_GENRES: "Genrer",
    DB_AWARDS: "Utmärkelser",
    DB_LANGS: "språk",
    POPULATION: "Population",
    DB_RELEASED: "Släppte",
    DB_NOT_FOUND: "Ingen film hittades med {search}",
    PLAYERS: "Spelare",
    VERSION: "Version",
    PORT: "Port",
    DESCRIPTION: "Beskrivning",
    NPM_NOT_FOUND: "No NPM packages were found with **{query}**",
    MC_NOT_FOUND: "Server wasn't found",
    NPM_SEARCH: "NPM-sökning",
    NPM_TOP_5: "Topp 5 hittade resultat för **{query}**",
    AUTHOR: "Författare",
    VIEW_ON_NPM: "Visa på npm ",
    MAX_PLAYERS: "Max spelare",
    PS_NOT_FOUND: "Ansökan hittades inte",
    DEVELOPER: "Utvecklare",
    SCORE: "Göra",
    CREATED_BY: "Created by {member}",
    MENTIONABLE: "Nämnbar",
    POSITION: "Position (from top)",
    ROLE_NOT_FOUND: "Roll hittades inte",
    ROLES: "Roller",
    NO_GUILD_ICON: "Den här guilden har ingen ikon",
    ENLARGED_EMOJI: "Förstorad version av {emoji}",
    INVALID_EMOJI: "Ogiltig emoji!",
    SKIN_NOT_FOUND: "Spelaren `{search}` hittades inte!",
    SKIN_NAME: "Spelarhud {name}",
    DOWNLOAD_SKIN: "[Ladda ner hud]",
    G_TRANSLATE: "Google översätt",
    NEW_SUGGESTION: "Nytt förslag",
    NO_SUGG_CHANNEL:
      "Din server har ingen standardförslagskanal!  N Använd `set suggest-channel <channel mention>` för att ställa in standardkanalen.",
    UPTIME: "{member} har varit på för {time}",
    BOT_UPTIME: "Bot has been up since: {botUpSince}",
    WEATHER: "Väder",
    C_NOT_FOUND: "Stad: **{query}** hittades inte!",
    MAIN: "Main",
    CURRENT: "Nuvarande",
    CURRENT_TEMP: "Aktuell temp ",
    FEELS_LIKE: "Känns som",
    WIND_SPEED: "Wind speed",
    WIND_DEGREES: "Vind grader",
    COUNTRY: "Land",
    NO_W_FOUND: "inga resultat hittades",
    DOC_NOT_FOUND: "Det hittades inte i dokumenten",
    MAINTAINERS: "Maintainers",
    DOWNLOADS: "Downloads",
    LAST_MODIFIED: "Last modified",
    ALPHA_CODE: "Alpha-2 code",
    CALLING_CODES: "Calling Codes",
    DOMAINS: "Domains",
    CAPITAL: "Capital",
    TIMEZONES: "Timezones",
    WEB_HTTP: "URL must start with `http://` or `https://`",
    WEB_NSFW: "Cannot display this site in a non-NSFW channel",
    WEB_UNAVAILABLE: "This site seems to be unavailable",
    IP_NOT_FOUND: "No results were found",
    IP_LON_LAT: "Lon/Lat",
    IP_ISP: "ISP",
    IP_ORG: "Org",
    IP_TIMEZONE: "Timezone",
    IP_LOC: "en", // https://ipwhois.io/documentation Localization
    VERIFY_CHANNEL: "Verification channel is: {channel}",
    VERIFY_NOT_ENABLED: "Verification is not enabled for this guild",
    CHANNEL_TYPES: {
      GUILD_TEXT: "Text channel",
      GUILD_VOICE: "Voice channel",
      GUILD_STAGE_VOICE: "Stage channel",
      GUILD_NEWS: "News channel",
      GUILD_STORE: "Store channel",
      GUILD_CATEGORY: "Category channel",
      GUILD_NEWS_THREAD: "New thread",
      GUILD_PUBLIC_THREAD: "Public thread",
      GUILD_PRIVATE_THREAD: "Private thread",
    },
    TOTAL_TRACKS: "Total tracks",
    RELEASE_DATE: "Release date",
    HEX_COLOR: "HEX Color",
    MDN_NOT_FOUND: "No results found for that query",
    UNKNOWN: "Unknown",
    PASTE_INVALID_FORMAT:
      "An invalid format was requested, valid types: https://pastebin.com/doc_api#5",
    SENT_SUG: "Sent suggestion 👍",
    ALREADY_VERIFIED: "You are already verified",
    READ_MORE: "read more",
    EMOJI_NOT_FOUND: "Emoji can only be a custom emoji or the emoji was not found",
    EMOJI_INFO: "Emoji info",
    INVALID_PERMS: "Invalid Permissions",
    CREATED_AT: "Created At",
    ACCESSIBLE_BY: "Accessible By",
    GENERAL_INFO: "General Info",
    USES: "Uses",
    NO_DESCRIPTION: "No description",
    GUILD: "Guild",
    CHANNEL: "Channel",
    INVITER: "Inviter",
    INVITE: "Invite",
    ROLE_MENTION: "Role mention",
    SPOT_ARTISTS: "Artists",
    SPOT_ALBUM: "Album",
    SPOT_GENRES: "Genres",
    SPOT_TOP: "Top 10 tracks",
    SPOT_TRACKS: "Tracks",
    SPOT_MORE_TRACKS: "{tracks - 10} more tracks",
    USER_INFO: "{username}'s info",
    GUILD_INFO: "Guild info",
    TEMPERATURE: "Temperature",
    MY_PING: "My ping is `{ping}`ms",
  },
  BOT: {
    GUILDS: "Guilds",
    CHANNELS: "Kanaler",
    USERS: "Användare",
    COMMAND_COUNT: "Kommandoantal",
    INFO_2: "Botinformation",
    INFO: "Botinformation",
    SYSTEM_INFO: "System information",
    RAM_USAGE: "RAM-användning",
    UPTIME: "Upptid",
    DJS_V: "Discord.js version",
    NODE_V: "NodeJS version",
    REPO: "Repository",
    DASHBOARD: "Dashboard",
    DEVELOPER: "Developer",
    CONTRIBUTORS: "Contributors",
    INVITE_BOT: "Invite bot",
    USED_SINCE_UP: "Used since up",
    TOTAL_USED_CMDS: "Total used",
    LATENCY: "Latency",
    CLICK_HERE: "Click Here",
  },
  HELP: {
    HELP: "Help",
    CAT_NOT_EXIST: "Den kategorin finns inte",
    CMD_NOT_FOUND: "Command or alias hittades inte",
    FULL_CMD_LIST: "View full detail command list",
    CLICK_ME: "Click me",
    COMMANDS: "Commands",
    COOLDOWN: "Kyla ner",
    ALIASES: "Alias",
    USAGE: "Användande",
    COMMAND: "Command",
    OPTIONS: "Options",
    OWNER_ONLY: "bara ägaren får se detta!",
    CUSTOM_CMD: "This is a custom command, therefore I cannot show more info",
    BOT_PERMS: "Bot Permissions",
    MEMBER_PERMS: "Member Permissions",
    DEPRECATED:
      "**Note: Regular are considered deprecated for GhostyBot. We're working hard to transition the last batch of regular commands to slash commands.**",
    CATEGORIES: {
      admin: "Administration commands",
      animal: "Djur Commands",
      "bot-owner": "Botägare Commands",
      games: "Spel Commands",
      image: "Bild Commands",
      music: "musik Commands",
      util: "Util Commands",
      economy: "Ekonomi Commands",
      levels: "Nivåer Commands",
      exempt: "Undantagna kommandon (kommandon som inte kan inaktiveras)",
      disabled: "Disabled commands (this guild only)",
      giveaway: "Giveaway commands",
      reminder: "Reminder commands",
      custom: "Custom commands",
      ticket: "Ticket commands",
    },
  },
  POKEMON: {
    SPECIES: "Arter",
    ABILITIES: "Förmågor",
    HEIGHT: "Höjd",
    WEIGHT: "Vikt",
    EXPERIENCE: "Erfarenhet",
    GENDER: "Kön",
    EGG_GROUPS: "Ägggrupper",
    FAMILY: "Familj",
    EVO_STAGE: "Evolution scenen",
    EVO_LINE: "Evolution linje",
    STATS: "Statistik",
    HP: "HP",
    ATTACK: "Ge sig på",
    DEFENSE: "Försvar",
    SP_ATK: "SP ATK",
    SP_DEF: "SP DEF",
    SPEED: "Fart",
    TOTAL: "Total",
    NOT_FOUND: "Ingen pokémon hittades med {query}. Använd rätt stavning och försök igen senare.",
  },
  REMINDER: {
    SUCCESS: "Success! I will ping you **in this channel** in {time}",
    REMOVE_SUCCESS: "Successfully removed your reminder",
    NO_REMINDER_SET: "You don't have a reminder set",
    INVALID_DATE: "That is not a valid date",
    NOT_FOUND: "That reminder was not found",
    UPDATED: "Updated reminder",
    NO_ACTIVE_REM: "User doesn't have any active reminders",
    MESSAGE: "Message:",
    TIME: "Time:",
    ENDS_IN: "Ends In:",
    USER_REMINDERS: "{memberUsername}'s active reminders",
    ALL_DELETED: "Removed all your reminders",
  },
  COVID: {
    CASES: "Cases",
    RECOVERED: "Recovered",
    DEATHS: "Deaths",
    TOTAL: "Total",
    TODAY: "Today",
    CRITICAL: "Critical",
    TESTS: "Tests",
    LAST_UPDATED: "Last updated",
    NOT_FOUND: "Country was not found",
    TOTAL_POP: "Population",
  },

  ADMIN: {
    CREATED_ROLE_CREATED: "Created Role",
    CREATED_ROLE_ADDED: "Successfully created the `{roleName}` role",
    DEAFEN_ALREADY_DEAFENED: "User is not in a voice channel or is already deafened",
    DEAFEN_SUCCESS:
      "{member} was successfully deafenned from the server. Reason: **{reason}**. I have also send a DM letting the person know.",
    DEAFEN_SUCCESS_DM: "You've been **Deafenned** from **{guild}**, Reason: **{reason}**",
    DELETE_PROVIDE_AMOUNT: "Amount must be a valid number and between 0 below 100",
    DELETE_DELETED: "Deleted {amount} messages.",
    DELETE_ERROR:
      "An error occurred when deleting the messages, make sure they are not older than 14days",
    KICK_CANNOT_KICK: "That person can't be kicked.",
    KICK_SUCCESS_DM: "You've been **kicked** from **{guild}**, Reason: **{reason}**",
    KICK_SUCCESS:
      "**{tag}** was successfully kicked from the server. Reason: **{reason}**. I have also send a DM letting the person know.",
    MUTE_CANNOT_MUTE: "That member cannot be muted",
    MUTE_ALREADY_MUTED: "Member is already muted",
    MUTE_SUCCESS_DM: "You've been **muted** from **{guild}**, Reason: **{reason}**",
    MUTE_SUCCESS:
      "**{tag}** was successfully muted from the server. Reason: **{reason}**. I have also send a DM letting the person know.",
    BAN_BANNED_BY: "**Banned By:**",
    NUKE_NUKED: "Channel was successfully nuked",
    NUKE_CANCELED: "Nuke command was canceled",
    NUKE_CONFIRM: "Are you sure you want to nuke this channel? y/n",
    CHANNEL_CANNOT_BE_DELETED: "That channel cannot be deleted",
    TEXT_OR_VALID_CHANNEL: "Please provide text or a valid channel!",
    DEFAULT_ANNOUNCE_CHANNEL:
      "You can also set a default channel using `set announce-channel <channel mention>`",
    CHANNEL_ALREADY_LOCKED: "That channel is already locked!",
    LOCKED_CHANNEL_REASON: "Successfully locked {channel}, Reason: **{lockReason}**",
    MY_ROLE_MUST_BE_HIGHER: "My role must be higher than **{roleName}** role!",
    MY_ROLE_MUST_BE_HIGHER2: "My role must be higher than **{needsRoleTag}** highest role!",
    REMOVED_ROLE: "Successfully removed **{roleName}** from {needsRole}",
    REMOVED_ROLE_EVERYONE: "Successfully Removed **{roleName}** from Everyone",
    PROVIDE_VALID_USER: "Please provide a valid user",
    NO_WARNINGS: "There are no warnings",
    ANNOUNCEMENT: "📢 Announcement 📢",
    PROVIDE_VALID_MEMBER: "Please provide valid a member",
    PROVIDE_VALID_EMOJI: "Please provide a valid emoji",
    EMOJI_ADDED: "Emoji Added",
    EMOJI_ADDED_NAME: "Emoji Has Been Added! | Name:",
    PREVIEW: "Preview:",
    USE_NORMAL_EMOJI: "You Can Use Normal Emoji Without Adding In Server!",
    MAX_EMOJI: "Maximum emoji count reached for this guild!",
    STICKY_LONG: "Your sticky message can not be longer than 1800 characters!",
    STICKY_READ: "__***:warning: Sticky Message, Read Before Typing! :warning:***__",
    ALREADY_MUTED: "User is already muted!",
    CAN_NOT_MUTED: "User can't be muted",
    TEMP_MUTED:
      "You've been **temporary muted** from **{guildName}**, Reason: **{reason}**, Time: **{time}**",
    SUCCESS_MUTED: "{muteMemberTag} was successfully muted for {time}. Reason: **{reason}**",
    PROVIDE_VALID_USERID: "Please provide a user id",
    SUC_UNBAN: "**{bannedUsername}** was successfully unbanned from the server.",
    NOT_IN_VOICE_OR_NOT_DEAF: "User is not in a voice channel or isn't deafened",
    UNDEAFENED_USER: "You've been **undeafened** from **{guildName}**",
    UNDEAFENED:
      "**{undeafenUserTag}** was successfully undeafened from the server. I have also send a DM letting the person know.",
    CHAN_NOT_LOCK: "That channel is not locked!",
    SUC_UNLOCK: "{channel} was successfully unlocked",
    NOT_MUTED: "User is not muted!",
    SUC_UNMUTE: "Successfully unmuted **{mutedMemberTag}**",
    STICKY_CLEAR: "Cleared sticky for **{channel}**",
    CAN_NOT_DISC: "User can't be disconnected.",
    NOT_IN_VOICE: "User is not in a voice at the moment.",
    YOU_DISC: "You've been **disconnected** from **{guildName}**, Reason: **{reason}**",
    USER_DISC:
      "**{kickUserTag}** was successfully disconnected from **{kickUserVoiceChannel}**. Reason: **{reason}**. I have also send a DM letting the person know.",
    USER_NOT_VOICE_OR_MUTED: "User is not in a voice channel or is already muted",
    YOU_MUTED: "You've been **Muted** from **{guildName}**, Reason: **{reason}**",
    USER_MUTED:
      "**{muteUserTag}** was successfully muted from the server. Reason: **{reason}**. I have also send a DM letting the person know.",
    USER_NOT_VOICE_OR_NOT_MUTED: "User is not in a voice channel or isn't muted",
    YOU_UNMUTED: "You've been **Unmuted** from **{guildName}**",
    USER_SUC_UNMUTED:
      "**{unmuteUserTag}** was successfully unmuted from the server. I have also send a DM letting the person know.",
    USER_NOT_WARN: "User can't be warned",
    USER_WARNED: "{memberTag} was warned with reason: {reason} (Total warnings: {warningsTotal})",
    WARN_NOT_FOUND: "warning wasn't found or {memberTag} doesn't have any warnings",
    WARNING: "Warning:",
    WARNED_ON: "Warned on:",
    MEMBER_WARNS: "{memberTag}'s warnings",
    TOTAL_WARNS: "Total warnings",
    ADDED_ROLE_TO: "Successfully added the **{roleName}** role for **{time}** to {userTag}",
    CANNOT_USE_CMD_THREAD: "Cannot use this command in a thread channel!",
  },
  TICKET: {
    CANNOT_DO_ACTION: "This action cannot be done in a non ticket channel",
    CLOSING: "Closing this ticket in 15 seconds, type `cancel` to cancel",
    WILL_NOT_CLOSE: "This ticket will not be closed.",
    ALREADY_ACTIVE_TICKET: "You already have an active ticket",
    TICKET_FOR: "Support ticket for: {member}",
    CREATED: "Successfully created ticket!",
    CREATED_IN: "Ticket was successfully created in {channel}",
    NOT_ENABLED:
      "Tickets are not enabled for this guild! An administrator can enable it in {botName}'s settings",
    TICKET: "ticket-#{Id}",
  },
  EVENTS: {
    CHANNEL_CREATED: "Channel Created",
    CHANNEL_CREATED_MSG: "{channel_type}: **{channel}** was created",
    CHANNEL_DELETED: "Channel Deleted",
    CHANNEL_DELETED_MSG: "{channel_type}: **{channel}** was deleted",
    CHANNEL_RENAME_MSG: "{channel_type}: **{channel}** was renamed to **{new_channel}**",
    CHANNEL_RENAME: "Channel Rename",
    CHANNEL_TOPIC_UPDATED: "Channel Topic Updated",
    CHANNEL_TOPIC_UPDATED_MSG: "Channel topic in channel: **{channel}** was updated",
    CHANNEL_OLD_TOPIC: "Old Topic",
    CHANNEL_NEW_TOPIC: "New Topic",
    EMOJI_CREATED_MSG: "Emoji: {emoji} was created",
    EMOJI_CREATED: "New Emoji Created",
    EMOJI_DELETED_MSG: "Emoji: **{emoji}** was deleted",
    EMOJI_DELETED: "Emoji Deleted",
    EMOJI_RENAMED_MSG: "Emoji: **{emoji_name}** was renamed to **{new_name}** ({emoji})",
    BANNED_MEMBER: "Banned Member",
    NOT_FOUND: "Not found",
    BAN_ADD: "Member Banned",
    KICK_ADD: "Member Kicked",
    EXECUTED_BY: "Executed By",
    REASON: "Reason",
    STICKER_CREATED: "New Sticker Created",
    STICKER_DELETED_MSG: "A sticker was deleted",
    STICKER_DELETED: "Sticker Deleted",
    STICKER_UPDATED: "Sticker updated",
    NAME_UPDATED: "Name updated",
    DESCRIPTION_UPDATED: "Description updated",
  },
  MESSAGE: {
    USER_IS_AFK: "{tag} är AFK!\n **Anledning**: {reason}",
    NOT_AFK_ANYMORE: "{tag} är inte AFK längre ",
    BLACKLISTED: "Du är svartlistad från att använda den här botten.",
    CATEGORY_DISABLED:
      "Det kommandot är inaktiverat eftersom den här guilden inaktiverade {category} kategori",
    COMMAND_DISABLED: "Det kommandot inaktiverades för denna guild",
    OWNER_ONLY: "Detta kommando kan bara användas av ägarna!",
    INCORRECT_ARGS: "Felaktig användning av kommandon",
    REQUIRED_ARGS: "Du måste ge fler argument: {args}",
    COOLDOWN_AMOUNT: "Vänta **{time}** flera sekunder innan du använder **{command}** kommando",
    BAD_WORD:
      "{mention}, du använde ett dåligt ord som administratören har ställt in, därför raderades ditt meddelande",
    EXAMPLE: "Exempel:",
    SUPPORT: "Stöd",
    NEED_PERMS: "Du behöver: {perms} behörigheter",
    MUST_BE_DATE: "That arg type must be a **date**. E.G.: `1h`, `2days`, `5min`",
    MUST_BE_NUMBER: "That arg type must be a **number**.",
  },
  GIVEAWAY: {
    NEW: "**🎉🎉 New Giveaway 🎉🎉**",
    ENDED: "**GIVEAWAY ENDED**",
    ALREADY_ENDED: "Giveaway already ended yet or was not found",
    SUCCESS_ENDED: "Successfully ended giveaway",
    SUCCESS_REROLLED: "Successfully re-rolled the giveaway",
    STARTED: "Giveaway has started",
    NOT_FOUND: "No giveaway found with id: {id}",
  },
  OTHER: {
    REGIONS: {
      europe: ":flag_eu: Europe",
      "eu-west": ":flag_eu: Europe-West",
      "eu-central": ":flag_eu: Europe-Central",
      brazil: ":flag_br: Brazil",
      hongkong: ":flag_hk: Hongkong",
      india: ":flag_in: India",
      japan: ":flag_jp: Japan",
      russia: ":flag_ru: Russia",
      singapore: ":flag_sg: Singapore",
      southafrica: ":flag_za: South Africa",
      sydney: ":flag_au: Sydney",
      frankfurt: ":flag_de: Frankfurt",
      "us-central": ":flag_us: USA-Central",
      "us-east": ":flag_us: US-East",
      "us-west": ":flag_us: US-West",
      "us-south": ":flag_us: US-South",
      amsterdam: ":flag_nl: Amsterdam",
      dubai: ":flag_ae: Dubai",
      "south-korea": ":flag_kr: South Korea",
      london: ":flag_gb: London",
    },
    MFA_LEVELS: {
      NONE: "None",
      ELEVATED: "Elevated",
    },
    VERLEVELS: {
      NONE: "None",
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
      VERY_HIGH: "Very High",
    },
    ANSWERS: [
      "Yes.",
      "No.",
      "My sources say yes",
      "Most likely.",
      "idk",
      "maybe sometime",
      "Outlook good.",
      "Signs point to yes.",
      "Definitely",
      "Absolutely",
      "Nope.",
      "No thanks, I won’t be able to make it.",
      "No Way!",
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
    ],
    WIND_DIRECTIONS: {
      NORTH: "North",
      NORTH_EAST: "North East",
      EAST: "East",
      SOUTH: "South",
      SOUTH_EAST: "South East",
      SOUTH_WEST: "South West",
      WEST: "West",
      NORTH_WEST: "North West",
    },
  },
  INVITE: {
    NOT_FOUND: "That invite was not found.",
    NOT_EXPIRED_YET: "This invite has not expired yet.",
    NOT_EXPIRE: "This invite does not expire",
    EXPIRATION: "Expiration",
    EXPIRES_AT: "Expires at",
    EXPIRED_AT: "Expired at",
  },
};

export default LANG;
