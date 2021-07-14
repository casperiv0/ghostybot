const LOCALE = {
  yes_no: "[y] Ja / [n] Nein",
  also_send_dm: "Es wurde auch eine Private Nachricht an die Person gesendet.",
};

const LANG: typeof import("./english").default = {
  GLOBAL: {
    EVERYONE: "Alle",
    NOT_SPECIFIED: "Nicht festgelegt",
    PROVIDE_ARGS: "Bitte Argumente Angeben",
    ERROR: "Ein unerwarteter Fehler ist aufgetreten",
    NAME: "Name",
    NOT_AN_OPTION: "`{option}` Ist keine gültige Option",
    SUCCESS: "Erfolgreich",
    REASON: "Grund",
    URL: "URL",
    NONE: "Keine",
    YES: "Ja",
    NO: "Nein",
  },
  GUILD: {
    NOT_FOUND: "Server wurde nicht gefunden",
    LEFT: "Erfolgreich den Server **{guild_name}** verlassen",
    LEVEL_UP_MESSAGES: "Auflevel Nachrichten",
    ANNOUNCE_CHANNEL: "Ankündigungskanal",
    SUGGEST_CHANNEL: "Kanal für Vorschläge",
    WELCOME_CHANNEL: "Begrüßungskanal",
    LEAVE_CHANNEL: "Abschiedskanal",
    PREFIX: "Präfix",
    OWNER: "Servereigentümer",
    CHANNEL_C: "Kanalanzahl",
    EMOJI_C: "Emojianzahl",
    ROLES_C: "Rollenanzahl",
    MEMBER_C: "Anzahl der Mitglieder",
    REGION: "Region",
    VERIFICATION: "Verifizierungstufe",
    MFA: "Multifaktor-Authentifizierungs Level",
    BOOSTS: "Boosts",
    BOOST_LVL: "Boosts Level",
    VERIFIED: "Verifiziert",
    PARTNERED: "Partner",
  },
  MEMBER: {
    TAG: "Tag",
    ROLES: "Rollen",
    BADGES: "Abzeichen",
    ONLINE: "Online",
    OFFLINE: "Offline",
    MEMBERS: "Mitglieder",
    STATUS: "Status",
    CREATED_ON: "Erstellt am",
    JOINED_AT: "Beigetreten am",
    ID: "Id",
    USERNAME: "Benutzername",
    NICKNAME: "Nickname",
    NOT_FOUND: "Mitglied nicht gefunden",
    CANNOT_BE_BANNED: "Dieses Mitglied kann nicht gebannt werden",
    DM_BAN_MESSAGE: "Du wurdest **gebannt** von **{guild_name}**, Grund: **{ban_reason}**",
    GUILD_BAN_MESSAGE: `{member} wurde erfolgreich vom Server gebannt. Grund: **{ban_reason}**. ${LOCALE.also_send_dm}`,
    BOT_DATA: " Bot-Daten werden nicht gespeichert, daher kann ich diese Daten nicht abrufen",
    PERMISSIONS: "Berechtigungen",
  },
  ROLES: {
    MY_ROLE_NOT_HIGH_ENOUGH: "Meine Rolle ist nicht hoch genug für die **{role}** Rolle!",
    MY_ROLE_MUST_BE_HIGHER: "Meine Rolle muss höher sein als die Rolle von **{member}**!",
    YOUR_ROLE_MUST_BE_HIGHER: "Deine Rolle muss höher sein als die **{role}** Rolle!",
    PROVIDE_ROLE: "Bitte gib eine Rolle an",
    ALREADY_HAS_ROLE: "Dieses Mitglied hat diese Rolle bereits",
    ADDED_ROLE_TO: "{member} erfolgreich **{role}** gegeben",
  },
  IMAGE: {
    CLICK_TO_VIEW: "[Klicke hier wenn das Bild nicht geladen ist.]",
    CLYDE: "Clyde",
    CUDDLES: "knuddelt mit",
    FEEDED: "fütterte",
    HUGGED: "umarmte",
    PATTED: "tätschelte",
    KISSED: "küsste",
    POKED: "stach",
    SLAPPED: "schlug",
    NO_GIPHY_KEY: "Es wurde keine giphy api in der config gefunden (kontaktiere den Bot Besitzer)",
    NO_GPIHY_FOUND: "Es wurden keine gifs damit gefunden",
  },
  ANIMAL: {
    CAT_FACT: "Katzenfakt",
    DOG_FACT: "Hundefakt",
    COW: "Kuh",
  },
  BOT_OWNER: {
    SHUTDOWN: "Der Bot fährt herunter",
    EVAL: "Der Befehl wird ausgeführt",
    EVAL_TYPE: "Typ",
    EVAL_INPUT: "Input",
    EVAL_OUTPUT: "Output",
    UPDATE_NICKNAME: "Vom Bot Besitzer aktualisiert",
    UPDATED_NICKNAME: "Der Nickname wurde erfolgreich zu **{nickname}** geändert",
    PROVIDE_TYPE: "Gib bitte einen Typ an",
    CANNOT_BL_OWNER: "Kann den Besitzer nicht auf die Blacklist setzen",
    CANNOT_BL_BOT: "Der Bot kann nicht auf die Blacklist gesetzt werden",
    NOT_BLD: "Der benutzer ist nicht auf der Blacklist",
    ALREADY_BLD: "{member} ist bereits auf der Blacklist",
    NOT_OPTION: "**{type}** ist keine gültige Option",
    BLACKLISTED: "Auf der Blacklist",
    UNBLACKLISTED: "Nicht auf der Blacklist",
    BLACKLISTED_SUCCESS: "{member} wurde {type}",
    BLD_STATUS: "Status der Blacklist",
  },
  LEVELS: {
    XP: "Erfahrungspunkte",
    LEVEL: "Level",
    LEADERBOARD: "Bestenliste",
    RESET_CONF: `Alle Erfahrungspunkte zurücksetzen? ${LOCALE.yes_no}`,
    RESET_SUCCESS: "Erfolgreich die Erfahrungspunkte von allen zurückgesetzt",
    RESET_CANCEL: "Das Zurücksetzen der Erfahrungspunkte wurde abgebrochen",
    PROVIDE_AMOUNT: "Gib bitte eine Anzahl an",
    PROVIDE_VALID_NR: "Gib bitte eine Gültige Nummer an",
    GIVE_XP_SUCCESS: "**{member}** erfolgreich **{amount}** Erfahrungspunkte gegeben",
    TOTAL_XP: "Alle Erfahrungspunkte",
    NEW_LEVEL: "Neues Level",
    LEVEL_UP: "Aufgelevelt!",
  },
  PERMISSIONS: {
    CREATE_INSTANT_INVITE: "Einladungen erstellen",
    KICK_MEMBERS: "Mitglieder hinauswerfen",
    BAN_MEMBERS: "Mitglieder bannen",
    ADMINISTRATOR: "Administrator",
    MANAGE_CHANNELS: "Kanäle verwalten",
    MANAGE_GUILD: "Den Server verwalten",
    ADD_REACTIONS: "Reaktionen hinzufügen",
    VIEW_AUDIT_LOG: "Audit-Log einsehen",
    PRIORITY_SPEAKER: "Priorisierter Sprecher verwenden",
    STREAM: "Live gehen",
    VIEW_CHANNEL: "Kanal ansehen",
    SEND_MESSAGES: "Nachrichten senden",
    SEND_TTS_MESSAGES: "Text-zu-Sprache-Nachrichten senden",
    MANAGE_MESSAGES: "Nachrichten verwalten",
    EMBED_LINKS: "Links einbetten",
    ATTACH_FILES: "Dateien anhängen",
    READ_MESSAGE_HISTORY: "Nachrichtenverlauf sehen",
    MENTION_EVERYONE: "@everyone erwähnen",
    USE_EXTERNAL_EMOJIS: "Externe Emojis verwenden",
    VIEW_GUILD_INSIGHTS: "Server-Einblicke anzeigen",
    CONNECT: "Sprachkanälen beitreten",
    SPEAK: "In Sprachkanälen sprechen",
    MUTE_MEMBERS: "Mitglieder Stummschalten",
    DEAFEN_MEMBERS: "Ein- und Ausgabe von Mitgliedern deaktivieren",
    MOVE_MEMBERS: "Mitglieder verschieben",
    USE_VAD: "Sprachaktivierung verwenden",
    CHANGE_NICKNAME: "Nickname ändern",
    MANAGE_NICKNAMES: "Nicknamen verwalten",
    MANAGE_ROLES: "Rollen verwalten",
    MANAGE_WEBHOOKS: "WebHooks verwalten",
    MANAGE_EMOJIS: "Emojis und Sticker verwalten",
    REQUEST_TO_SPEAK: "Redeanfrage",
    USE_APPLICATION_COMMANDS: "Slash-Befehle verwenden",
    STAGE_MODERATOR: "Podiumskanal Moderator",
  },
  MUSIC: {
    MUST_BE_IN_VC: "Du musst in einem Sprachkanal sein",
    NO_QUEUE: "Momentan wird kein Lied abgespielt",
    NO_PREV_QUEUE: "Es wurde kein vorheriges Lied gefunden",
    QUEUE_CLEARED: "Die Warteschlange wurde geleert",
    QUEUE: "Warteschlange",
    BETWEEN_0_100: "Die Lautstärke muss zwischen 0 und 100 sein",
    BETWEEN_1_TOTALQUEUE: "Benutze eine Lied Nummer zwischen 1 und {totalQueue}",
    REMOVE_SUCCESS: "wurde von der Warteschlange entfernt",
    VOL_SUCCESS: "Erfolgreich die Lautstärke auf {vol}% gesetzt",
    PLAYING: "Läuft",
    PAUSED: "Pausiert",
    DURATION: "Dauer",
    PROVIDE_SEARCH: "Gib bitte eine Suche an",
    ADDED_TO_QUEUE: "{song} wurde zur Warteschlange hinzugefügt",
    ADDED_PL_TO_QUEUE: "Playlist: {name} wurde zur Warteschlange hinzugefügt ({length} Lieder)",
    NOW_PLAYING: "Läuft jetzt:",
    REQUESTED_BY: "Von {user} angefordert",
    NO_PERMS: "Ich habe nicht die richtigen Berechtigungen für diesen Sprachkanal!",
    NO_RESULTS: "Es wurden keine Lieder gefunden",
    SUC_REM_FILTER: "Erfolgreich {filter} entfernt",
    SUC_APPLIED_FILTER: "Erfolgreich {filter} angewandt",
    FILTER_NOT_FOUND: "Der Filter wurde nicht gefunden",
    FILTER_ALREADY_ENABLED: "Filter `{filter}` ist bereits aktiviert",
    FILTER_NOT_ENABLED: "Filter `{filter}` ist nicht aktiviert?",
    NOT_VALID_OPTION: "{option} ist keine gültige Option wie `set` oder `remove`",
    NO_LIRYCS: "Kein Text für {songTitle} gefunden.",
    NOW: "Jetzt",
    MUSIC_STARTING: "Die Musik startet jetzt. Warte bitte kurz..",

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
    MONEY: "Geld",
    BANK: "Bank",
    BALANCE: "Kontostand",
    DAILY_ERROR: "Du hast deinen Täglichen Bonus bereits eingesammelt",
    WEEKLY_ERROR: "Du hast deinen Wöchentlichen Bonus bereits eingesammelt",
    DAILY_SUCCESS: "Du hast deinen Täglichen Bonus von **{amount}** Münzen eingesammelt",
    WEEKLY_SUCCESS: "Du hast deinen Wöchentlichen Bonus von **{amount}** Münzen eingesammelt",
    STORE_EMPTY:
      "Der Shop für diesen Server ist leer! Frag einen Moderator, etwas hinzuzufügen, mithilfe von`{prefix}store add <item>`",
    PROVIDE_ITEM_TO_BUY: "Gib bitte ein Item zum Kaufen an",
    NOT_ENOUGH_MONEY: "Du hast nicht so viel Geld",
    BUY_SUCCESS: "Erfolgreich **{item}** für **{price}** gekauft",
    NOT_FOUND_STORE:
      "**{query}** wurde im Shop nicht gefunden, benutze `{prefix}store` um alle Items im Shop zu sehen",
    ALREADY_OWN_ITEM: "Du besitzt dieses Item bereits",
    DEPOSITED_ALL: "Erfolgreich all dein Geld eingelegt!",
    DEPOSITED_AMOUNT: "Erfolgreich **{amount} Münzen** eingelegt",
    WITHDRAW_ALL: "Erfolgreich all dein Geld abgehoben!",
    WITHDRAW_AMOUNT: "Erfolgreich **{amount} Münzen** abgehoben",
    PROFILE: "Profil",
    INV_EMPTY: "Das Inventar des Benutzers ist leer",
    INVENTORY: "Inventar",
    INV_ITEMS: "Items im Inventar",
    VIEW_INVENTORY: "Benutze `{prefix}inventory <user>` um deren Items im Inventar zu sehen.",
    MONEY_LEADERBOARD: "Bestenliste des Geldes",
    TOTAL_BALANCE: "Gesammter Kontostand",
    BOTH_COUNTED: "Bank und Geld zusammen",
    DICE_LANDED: "Du hast das gewürfelt: {roll}",
    DICE_WON: "Glückwunsch! Du hast einen Preis von **{price} Münzen** gewonnen",
    DICE_LOST: "Du musst eine **6** würfeln, um einen Preis von **{price} Münzen** zu bekommen",
    RECENTLY_WORKED: "Du hast erst kürzlich gearbeitet, {time} verbleibend",
    WORKED: "{member}hat als **{job_name}** gearbeitet und **{amount}** verdient!",
    CANNOT_PAY_SELF: "Du kannst dich nicht selbst bezahlen",
    PAY_SUCCESS: "Erfolgreich **{member}** **{amount} Münzen** gegeben",
    CANNOT_ROB_SELF: "Du kannst dich selbst nicht ausrauben!",
    BETWEEN_1_1000: "Die Anzahl muss zwischen 1 und 1000 sein",
    MEMBER_NO_MONEY: "Der Benutzer hat kein Geld, also kannst du ihn nicht ausrauben.",
    ROB_SUCCESS: "Erfolgreich **{amount} Münzen** von **{member}** geraubt",
    STORE: "Shop",
    MANAGE_STORE_PERMS:
      "Du hast nicht die richtigen Berechtigungen um den Shop zu verwalten! (Server verwalten)",
    PROVIDE_VALID_ITEM: "Gib bitte ein gültiges Item zu hinzufügen/entfernen an !",
    PRICE: "Preis",
    ALREADY_EXISTS: "**{item}** existiert bereits im Shop!",
    PROVIDE_PRICE: "Gib bitte einen Preis für das Item an!",
    MUST_BE_NUMBER: "Der Preis muss eine Nummer sein!",
    ADDED_TO_STORE: "{item} wurde zum Shop hinzugefügt!",
    NOT_IN_STORE: "**{item}** existiert nicht im Shop!",
    REMOVED_FROM_STORE: "{item} wurde aus dem Shop entfernt!",
    WON_SLOTS: "Du hast gewonnen und {amount} Münzen bekommen",
    LOST_SLOTS: "Du hast verloren!",
    MAX_BET: "Der Maximale Einsatz beträgt 500",
    ADDED_MONEY: "Erfolgreich {amount} zum Konto hinzugefügt",
    REMOVED_MONEY: "Erfolgreich {amount} vom Konto entfernt",
    MIN_BET: "Du musst mindestens 1 wetten",
    MIN_AMOUNT: "Die Anzahl muss mehr als 0 sein",
    RESET_CONF: `Alle Kontostände zurücksetzen? ${LOCALE.yes_no}`,
    RESET_SUCCESS: "Erfolgreich die Kontostände von allen zurückgesetzt",
    RESET_CANCEL: "Das Zurücksetzen wurde abgebrochen",
    PROVIDE_AMOUNT: "Bitte gib eine Anzahl zum abheben an",
    NO_MONEY: "Duz hast nicht so viel Geld auf der Bank!",
    WORK: "Arbeite!",
  },
  GAMES: {
    BETS_ON: "{member_1} setzt auf {member_2}",
    LOST_BET: "{member_1} hat auf {member_2} gesetzt!\n {member_1} hat die Wette nicht gewonnen",
    WON_BET: "{member_1} hat auf {member_2} gesetzt and {member_1} hat die Wette gewonnen",
    CALC: "Rechner",
    INVALID_CALC: "Ungültige Rechnung",
    COMPLIMENT: "Kompliment",
    LANDED_TAILS: "Die Münze zeigt Zahl",
    LANDED_HEADS: "Die Münze zeigt Kopf",
    HAPPINESS: "Zufriedenheit",
    IQ_TEST: "Intelligenz Test",
    IQ_IS: "Dein IQ ist: {iq}",
    RPS: "Schere Stein Papier",
    ROCK: "Stein",
    PAPER: "Papier",
    SCISSORS: "Schere",
    WYR: "Würdest du eher?",
    ANSWER: "Antwort",
    QUESTION: "Frage",
    YOU_WON: "Du hast 50 Münzen gewonnen!",
    BOT_WON: "Der Bot hat gewonnen!",
    BOTH_WON: "Es ist ein Unentschieden",
    OPPONENTS_CHOICE: "Der Gegner ist am Zug",
    YOUR_CHOICE: "Dein Zug",
    WINNER: "Gewinner",
    INVALID_INPUT: "Der Input muss etwas des Folgenden sein:",
    QUOTE: "Zitat",
    TAGS: "Tags",
  },
  UTIL: {
    PROCESSING_IMAGE: "⚙ Bild wird verarbeitet..",
    TEXT_NOT_SUP: "Dieser Text wird nicht unterstützt",
    AVATAR: "Avatar",
    NOT_AFK: "Du bist nicht mehr afk",
    AFK: "Du bist nun afk",
    BMI_WEIGHT: "Gewicht",
    BMI_HEIGHT: "Größe",
    BMI: "BMI",
    SUPPORT_SERVER: "Support Server",
    BUG_REPORT: "{member} hat einen Fehler gemeldet",
    BUG_REPORTED: "Fehlerbericht wurde gesendet!",
    CHANNEL_TOPIC: "Kanalthema",
    TEXT_CHANNEL: "Textkanal",
    VOICE_CHANNEL: "Sprachkanal",
    TEXT_CHANNELS: "Textkanäle" /* plural! */,
    VOICE_CHANNELS: "Sprachkanäle" /* plural! */,
    NO_DEF_FOUND: "Keine Definition für {word} gefunden",
    DEF_FOR_WORD: "Definition für {word}",
    CATEGORY: "Kategorie",
    DEFINITION: "Definition",
    DEPENDENCIES: "Abhängigkeiten",
    ANIMATED: "Animiert",
    NON_ANIMATED: "Nicht Animiert",
    NEW_FEEDBACK: "Feedback verfassen",
    FEEDBACK_SEND: "Feedback erfolgreich versendet!",
    GH_NOT_FOUND: "GitHub Account wurde nicht gefunden",
    GH_FOLLOWING: "Du Folgst",
    GH_FOLLOWERS: "Du wirst gefolgt",
    GH_WEBSITE: "Webseite",
    GH_LOCATION: "Ort",
    GH_BIO: "Biographie",
    SEARCHING: "Suche",
    NO_IMG_FOUND: "Keine Bilder gefunden",
    DB_RATINGS: "Bewertungen",
    DB_COUNTRY: "Land",
    DB_GENRES: "Genres",
    DB_AWARDS: "Auszeichnungen",
    DB_LANGS: "Sprachen",
    POPULATION: "Einwohner",
    DB_RELEASED: "Erschienen",
    DB_NOT_FOUND: "Es wurde kein Film mit {search} gefunden",
    TOTAL_MB: "Insgesamt",
    HUMANS: "Menschen",
    BOTS: "Bots",
    PLAYERS: "Spieler",
    VERSION: "Version",
    PORT: "Port",
    DESCRIPTION: "Beschreibung",
    NPM_NOT_FOUND: "Es wurden keine NPM Pakete mit **{query}** gefunden",
    MC_NOT_FOUND: "Der Server wurde nicht gefunden",
    NPM_SEARCH: "NPM Suche",
    NPM_TOP_5: "Die besten 5 Ergebnisse für **{query}**",
    AUTHOR: "Author",
    VIEW_ON_NPM: "In npm anschauen",
    MAX_PLAYERS: "Maximale Spieler",
    PS_NOT_FOUND: "Anwendung wurde nicht gefunden",
    DEVELOPER: "Entwickler",
    SCORE: "Punktestand",
    CREATED_BY: "Von {member} erstellt",
    MENTIONABLE: "Erwähnbar",
    POSITION: "Position (vom besten)",
    ROLE_NOT_FOUND: "Rolle wurde nicht gefunden",
    ROLES: "Rollen",
    NO_GUILD_ICON: "Dieser Server hat kein Icon",
    ENLARGED_EMOJI: "Vergrößerte Version von {emoji}",
    INVALID_EMOJI: "Ungültiges Emoji!",
    SKIN_NOT_FOUND: "Der Spieler `{search}` wurde nicht gefunden!",
    SKIN_NAME: "Skin des Spielers {name}",
    DOWNLOAD_SKIN: "[Skin herunterladen]",
    G_TRANSLATE: "Google Übersetzer",
    NEW_SUGGESTION: "Neuer Vorschlag",
    NO_SUGG_CHANNEL:
      "Der Server hat keinen Standard Kanal für Vorschläge!\n Benutze `set suggest-channel <channel mention>` um den Standard Kanal dafür zu setzen.",
    UPTIME: "{member} ist seit {time} online",
    WEATHER: "Wetter",
    C_NOT_FOUND: "Stadt: **{query}** wurde nicht gefunden!",
    MAIN: "Standard",
    CURRENT: "Aktuell",
    CURRENT_TEMP: "Aktuelle Temperatur",
    FEELS_LIKE: "Gefühlt",
    WIND_SPEED: "Windgeschwindigkeit",
    WIND_DEGREES: "Windstärke",
    COUNTRY: "Land",
    NO_W_FOUND: "Es wurde nicht gefunden",
    DOC_NOT_FOUND: "Das wurde nicht in der Dokumentation gefunden",
    MAINTAINERS: "Verwalter",
    DOWNLOADS: "Downloads",
    LAST_MODIFIED: "Zuletzt bearbeitet",
    ALPHA_CODE: "Alpha-2 Code",
    CALLING_CODES: "Anruf-Codes",
    DOMAINS: "Domains",
    CAPITAL: "Hauptstadt",
    TIMEZONES: "Zeitzonen",
    WEB_HTTP: "URL muss mit `http://` oder `https://` starten",
    WEB_NSFW: "Kann das nicht in einem nicht-NSFW Kanal machen",
    WEB_UNAVAILABLE: "Diese Seite scheint nicht erreichbar zu sein",
    IP_NOT_FOUND: "Keine Ergebnisse gefunden",
    IP_LON_LAT: "Längengrad / Breitengrad",
    IP_ISP: "Internet Anbieter",
    IP_ORG: "Organisation",
    IP_TIMEZONE: "Zeitzone",
    IP_LOC: "de", // https://ipwhois.io/documentation Localization
    VERIFY_CHANNEL: "Verifizierungskanal ist: {channel}",
    VERIFY_NOT_ENABLED: "Verifizierung ist auf diesem Server nicht aktiviert",
    CHANNEL_TYPES: {
      GUILD_TEXT: "Textkanal",
      GUILD_VOICE: "Sprachkanal",
      GUILD_STAGE_VOICE: "Podiumskanal",
      GUILD_NEWS: "Ankündigungskanal",
      GUILD_STORE: "Shopkanal",
      GUILD_CATEGORY: "Kategoriekanal",
    },

    TOTAL_TRACKS: "Alle Lieder",
    RELEASE_DATE: "Erscheinungdatum",
    HEX_COLOR: "HEX Color",
    MDN_NOT_FOUND: "No results found for that query",
  },
  BOT: {
    GUILDS: "Server",
    CHANNELS: "Kanäle",
    USERS: "Benutzer",
    COMMAND_COUNT: "Anzahl an Befehlen",
    VC_CONNS: "Verbindungen mit dem Sprachkanal",
    INFO_2: "Bot Informationen",
    INFO: "Bot info",
    SYSTEM_INFO: "System Info",
    RAM_USAGE: "RAM in Benutzung",
    UPTIME: "Betriebszeit",
    DJS_V: "Discord.js Version",
    NODE_V: "NodeJS Version",
    REPO: "Projektarchiv",
    DASHBOARD: "Dashboard",
    DEVELOPER: "Entwickler",
    CONTRIBUTORS: "Mitwirkende",
    INVITE_BOT: "Bot einladen",
    USED_SINCE_UP: "Seit Anfang benutzt",
    TOTAL_USED_CMDS: "Insgesamt benutzt",
    LATENCY: "Verzögerung",
  },
  CONFIG: {
    OPTION_CMD_WORK: "{option} muss gegeben sein, damit der Befehl funktioniert.",
  },
  HELP: {
    CAT_NOT_EXIST: "Diese Kategorie existiert nicht",
    CMD_NOT_FOUND: "Befehl oder Pseudonym nicht gefunden",
    FULL_CMD_LIST: "Zeige die volle Befehlsliste",
    CLICK_ME: "Klick mich",
    COMMANDS: "Befehle",
    COOLDOWN: "Abklingzeit",
    ALIASES: "Pseudonymé",
    USAGE: "Benutzung",
    COMMAND: "Befehl",
    OPTIONS: "Optionen",
    GUILD_PREFIX: "Server Präfix",
    CMD_DESC:
      "benutze`{prefix}help <command name | alias>` um mehr über den Befehl zu erfahren\n Mehr darüber erfährst du durch das Benutzen von dem `botinfo` Befehl",
    OWNER_ONLY: "Nur der Besitzer kann das sehen!",
    CUSTOM_CMD:
      "Das ist ein benutzerdefinierter Befehl, daher kann ich nicht mehr Informationen geben",
    BOT_PERMS: "Bot Berechtigungen",
    MEMBER_PERMS: "Berechtigungen der Mitglieder",
    CATEGORIES: {
      admin: "Administrator Befehle",
      animal: "Tierbefehle",
      botowner: "Botbesitzer Befehle",
      games: "Spielbefehle",
      image: "Bildbefehle",
      music: "Musik Befehle",
      util: "Werkzeug Befehle",
      economy: "Wirtschaft Befehle",
      levels: "Level Befehle",
      exempt: "Ausgeschlossene Befehle (Befehle die nicht deaktiviert werden können)",
      disabled: "Deaktivierte Befehle (Nur für diesen Server)",
      giveaway: "Geschenk Befehle",
      reminder: "Erinnerungs Befehle",
      reactions: "Reaktionsrollen Befehle",
      custom: "Benutzerdefinierte Befehle",
      ticket: "Ticket Befehle",
    },
  },
  NASANEWS: {
    NOT_FOUND: "Es wurde kein Fakt mit {query} gefunden.",
  },
  POKEMON: {
    SPECIES: "Art",
    ABILITIES: "Fähigkeiten",
    HEIGHT: "Größe",
    WEIGHT: "Gewicht",
    EXPERIENCE: "Erfahrung",
    GENDER: "Geschlecht",
    EGG_GROUPS: "Ei Gruppe",
    FAMILY: "Familie",
    EVO_STAGE: "Entwicklungsstufe",
    EVO_LINE: "Entwicklungszweig",
    STATS: "Statistiken",
    HP: "Leben",
    ATTACK: "Angriff",
    DEFENSE: "Verteidigung",
    SP_ATK: "Spezial Angriff",
    SP_DEF: "Spezial Verteidigung",
    SPEED: "Geschwindigkeit",
    TOTAL: "Insgesamt",
    NOT_FOUND:
      "Es wurde kein Pokémon mit {query} gefunden. Bitte schreibe es richtig und versuch es später noch einmal.",
  },
  REACTIONS: {
    NO_ROLE: "Gib bitte eine gültige Rolle an",
    CHANNEL_NOT_FOUND: "Es wurde keine Kanal mit der ID `{channelId}` gefunden",
    TITLE: "Reaktionsrolle",
    DESC: "Reaktionen:",
    SUCCESS: "Erfolgreich eine Nachricht mit Reaktionen gesendet",
    NOT_FOUND: "Reaktion wurde nicht gefunden",
    DELETE_SUCCESS: "Reaktion erfolgreich gelöscht",
    FOUND_NO_MSG:
      "Reaktion wurde gefunden, die Nachricht aber nicht, Reaktion wurde von der Datenbank gelöscht",
    ROLES:
      "Sende deine Rollen durch die ID mit einem Leerzeichen dazwischen. z.B.: 389730847098379087 9876096987980987 7867869876689766",
    EMOJIS:
      "Bitte sende deine Emojis. Die Riehenfolge wird mit den Rollen übereingestimmt. Ein Leerzeichen zum Trennen benutzen",
    VALID_EMOJI: "Du musst ein gültiges Emoji angeben(Kein benutzerdefiniertes Emoji)!",
  },
  REMINDER: {
    SUCCESS: "Erfolgreich! Ich werde dich **in diesem Kanal** in {time} pingen",
    REMOVE_SUCCESS: "Die Erinnerung erfolgreich entfernt",
    NO_REMINDER_SET: "Du hast keine aktiven Erinnerungen",
    INVALID_DATE: "Das ist kein gültiges Datum",
    NO_ACTIVE_REM: "Der Benutzer hat keine aktiven Erinnerungen",
    MESSAGE: "Nachricht:",
    TIME: "Zeit:",
    ENDS_IN: "Endet in:",
    USER_REMINDERS: "{memberUsername}'s aktiven Erinnerungen",
  },
  COVID: {
    CASES: "Fälle",
    RECOVERED: "Genesen",
    DEATHS: "Tode",
    TOTAL: "Insgesamt",
    TODAY: "Heute",
    CRITICAL: "Kritischer Zustand",
    TESTS: "Tests",
    LAST_UPDATED: "Zuletzt aktualisiert",
    NOT_FOUND: "Land wurde nicht gefunden",
    TOTAL_POP: "Bevölkerung",
  },
  EASY_GAMES: {
    PROVIDE_MEMBER: "Bitte gib ein Mitglied an",
    ACCEPT_CHALLENGE: "{user} akzeptierst du die Herausforderung?",
    DOESNT_PLAY: "Sieht so aus, als ob {user} nicht spile wollte",
    WICH_SIDE: "**{user}, Welche Seite wählst du? Gib `End` ein, um aufzugeben!**",
    GAME_OVER: "Die Zeit ist um!",
    END: "Ende",
    INACTIVITY: "Das Spiel wurde wegen Inaktivität beendet!",
    WINNER: "Glückwunsch du hast gewonnen: {winner}",
    DRAW: "Es ist ein Unentschieden",
  },
  ADMIN: {
    SET_CMD:
      "Da der Bot immer komplexer wird, ist es leider schwierig, alles in einem Befehl zu verwalten. Kein Grund zur Sorge! Sie können alles in unserem Dashboard verwalten: {url}. Vielen Dank für Ihr Verständnis",
    ADD_CMD_ALREADY_EXISTS:
      "Dieser Name ist bereits in den Benutzerdefinierten Server Befehlen vorhanden.",
    ADD_CMD_USED_BY_BOT: "Dieser Befehlsname wird bereits verwendet",
    ADD_CMD_ADDED:
      "Erfolgreich **{name}** als einen benutzerdefinierten Befehl für diesen Server hinzugefügt",
    DEL_CMD_NOT_FOUND: "Dieser Befehl wurde nicht gefunden",
    DEL_CMD_DELETED: "Erfolgreich den Befehl **{cmd}** gelöscht",
    DEL_CMD_NO_COMMANDS: "Dieser Server hat keine benutzerdefinierten Befehle",
    BLACKLISTED_ALREADY_EXISTS: "**{item}** existiert bereits in den Verbotenen Wörtern",
    BLACKLISTED_ADDED: "Erfolgreich **{item}** zu den Verbotenen Wörtern hinzugefügt",
    BLACKLISTED_NOT_EXISTS: "**{item}** existiert nicht in den Verbotenen Wörtern",
    BLACKLISTED_REMOVED: "**{item}** erfolgreich aus den Verbotenen Wörtern entfernt",
    BLACKLISTED_NONE_YET: "Es existieren noch keine Verbotenen Wörter.",
    BLACKLISTED_NO_WORDS: "Dieser Serve hat noch keine Verbotenen Wörter.",
    CREATED_ROLE_CREATED: "Rolle erstellt",
    CREATED_ROLE_ADDED: "Erfolgreich die `{roleName}` Rolle erstellt",
    C_TOPIC_PROVIDE_TOPIC: "Bitte gib ein neues Thema an",
    C_TOPIC_ADDED: "Das Kanalthema erfolgreich zu {topic} geändert",
    DEAFEN_ALREADY_DEAFENED: "Der Benutzer ist in keinem Sprachkanal oder bereits Stummgeschalten",
    DEAFEN_SUCCESS: `{member} wurde erfolgreich Stummgeschalten auf dem Server. Grund: **{reason}**. ${LOCALE.also_send_dm}`,
    DEAFEN_SUCCESS_DM: "Du wurdest **Stummgeschalten** vom Server **{guild}**, Grund: **{reason}**",
    DELETE_PROVIDE_AMOUNT: "Die Anzahl muss größer als 0 und kleiner als 100 sein",
    DELETE_DELETED: "{amount} Nachrichten gelöscht.",
    DELETE_ERROR:
      "Es ist ein Fehler beim löschen der Nachrichten aufgetreten, stell sicher, dass die NAchrichten nicht älter als 14 Tage sind",
    KICK_CANNOT_KICK: "Diese PErson kann nicht gekickt werden.",
    KICK_SUCCESS_DM: "Du wurdest **gekickt** vom Server **{guild}**, Grund: **{reason}**",
    KICK_SUCCESS: `**{tag}** wurde erfolgreich vom Server gekickt. Grund: **{reason}**.  ${LOCALE.also_send_dm}`,
    MUTE_CANNOT_MUTE: "Dieses Mitglied kann nicht stummgeschalten werden",
    MUTE_ALREADY_MUTED: "Mitglied ist bereits stummgeschalten",
    MUTE_SUCCESS_DM: "Du wurdest **stummgeschalten** vom Server **{guild}**, Grund: **{reason}**",
    MUTE_SUCCESS: `**{tag}**wurde erfolgreich stummgeschalten. Grund: **{reason}**. ${LOCALE.also_send_dm}`,
    BAN_BANNED_BY: "**Gebannt von:**",
    NUKE_NUKED: "Kanal wurde erfolgreich ausgelöscht",
    NUKE_CANCELED: "Auslöschung wurde abgebrochen",
    NUKE_CONFIRM: `Möchtest du wirklich diesen Kanal auslöschen? ${LOCALE.yes_no}`,
    CHANNEL_CANNOT_BE_DELETED: "Dieser Kanal kann nicht gelöscht werden",
    TEXT_OR_VALID_CHANNEL: "Bitte gib text oder einen gültigen Kanal an!",
    DEFAULT_ANNOUNCE_CHANNEL:
      "Du kannst auch einen Standard Kanal setzen mithilfe von `set announce-channel <channel mention>`",
    OPTION_DOES_NOT_EXIST: "{option} existiert nicht",
    PROVIDE_COMMAND_OR_CATEGORY_NAME: "Gib bitte einen Befehl oder einen Kategorienamen an",
    COMMAND_CANNOT_DISABLED: "Dieser Befehl kann nicht angezeigt werden",
    COMMAND_ALREADY_DISABLED: "Dieser Befehl ist bereits deaktiviert",
    COMMAND_DISABLED: "Erfolgreich {commandName} **deaktiviert**",
    COMMAND_ENABLED: "Erfolgreich {commandName} **aktiviert**",
    COMMAND_NOT_DISABLED: "Dieser Befehl ist nicht deaktiviert",
    COMMAND_OR_CATEGORY_NOT_FOUND: "Befehl oder Kategorie wurde nicht gefunden",
    COMMAND_NOT_FOUND: "Befehl wurde nicht gefunden",
    CATEGORY_CANNOT_DISABLED: "Diese Kategorie kann nicht deaktiviert werden!",
    CATEGORY_ALREADY_DISABLED: "Diese Kategorie ist bereist deaktiviert",
    CATEGORY_DISABLED: "Erfolgreich {category} **deaktiviert**",
    CATEGORY_ENABLED: "Erfolgreich {category} **aktiviert**",
    CATEGORY_NOT_DISABLED: "Diese Kategorie ist nicht deaktiviert",
    DISABLED_CATEGORY: "Kategorie Deaktiviert",
    DISABLED_COMMAND: "Befehl Deaktiviert",
    ENABLED_CATEGORY: "Kategorie Aktiviert",
    ENABLED_COMMAND: "Befehl Aktiviert",
    PROVIDE_CHANNEL: "Gib bitte einen Kanal an",
    CHANNEL_ALREADY_IGNORED: "Dieser Kanal wird bereits vom Bot ignoriert",
    CHANNEL_NOT_IGNORED: "Dieser Kanal wird nicht vom Bot ignoriert",
    REMOVE_IGNORED: "{item} von ignorierten Kanälen entfernt",
    NOT_A_OPTION: "`{option}` ist keine gültige Option",
    CHANNEL_ALREADY_LOCKED: "Dieser Kanal ist bereits gesperrt!",
    REASON_LOCK_CHANNEL: "Gib bitte einen Grund zum Sperren dieses Kanals an",
    LOCKED_CHANNEL_REASON: "Erfolgreich {channel} gesperrt, Grund: **{lockReason}**",
    NO_PERMISSIONS: "Tut uns leid, du hast nicht die richtigen Berechtigungen für diesen Befehl.",
    CURRENT_PREFIX:
      "Aktuelles Server Präfix: `{guildPrefix}`\nBenutze `{guildPrefix}prefix <prefix>` um ein neues Präfix zu setzen",
    UPDATE_PREFIX: "Präfix erfolgreich zu `{prefix}` geändert",
    MY_ROLE_MUST_BE_HIGHER: "Meine Rolle muss höher als die **{roleName}** Rolle sein!",
    MY_ROLE_MUST_BE_HIGHER2:
      "Meine Rolle muss höher als die höchste Rolle von **{needsRoleTag}** sein!",
    USER_WAS_NOT_FOUND: "Benutzer wurde nicht gefunden",
    REMOVED_ROLE: "Erfolgreich **{roleName}** von {needsRole} entfernt",
    REMOVED_ROLE_EVERYONE: "Erfolgreich **{roleName}** von allen entfernt",
    PROVIDE_VALID_USER: "Gib bitte einen gültigen Benutzer an",
    NO_WARNINGS: "Keine Warnungen vorhanden",
    REMOVED_ALL_WARNINGS: "Erfolgreich alle Verwarnungen entfernt",
    ANNOUNCEMENT: "📢 Ankündigung 📢",
    PROVIDE_VALID_MEMBER: "Gib bitte ein gültiges Mitglied an",
    PROVIDE_VALID_EMOJI: "Gib bitte ein gültiges Emoji an",
    PROVIDE_VALID_OPTION: "Gib bitte eine gültige Option an",
    PROVIDE_VALID_CHANNEL_OR_ROLE: "Gib bitte einen gültigen Kanal oder Rolle an!",
    GIVE_NAME: "give_name",
    EMOJI_ADDED: "Emoji hinzugefügt",
    EMOJI_ADDED_NAME: "Emoji wurde hinzugefügt! | Name:",
    PREVIEW: "Vorschau:",
    USE_NORMAL_EMOJI: "Du kannst normale Emojis ohne Server benutzen!",
    MAX_EMOJI: "Maximale Emoji Anzahl für diesen Server erreicht!",
    STICKY_LONG: "Deine Angepinnte Nachricht kann nicht länger als 1880 Zeichen sein!",
    STICKY_READ:
      "__***:warning: Angepinnte Nachricht, Lies das bevor du etwas schreibst! :warning:***__",
    ALREADY_MUTED: "Benutzer ist bereits stunmmgeschalten!",
    CAN_NOT_MUTED: "Benutzer kann nicht stunmmgeschalten werden",
    TEMP_MUTED:
      "Du wurdest **temporär stunmmgeschalten** vom Server **{guildName}**, Grund: **{reason}**, Zeit: **{time}**",
    SUCCES_MUTED:
      "{muteMemberTag} wurde erfolgreich für {time} stummgeschalten. Grund: **{reason}**",
    PROVIDE_VALID_USERID: "Gib bitte eine ID von einem Benutzer an",
    SUC_UNBAN: "**{bannedUsername}** wurde erfolgreich vom Server entbannt.",
    NOT_IN_VOICE_OR_NOT_DEAF: "Benutzer ist in keinem Sprachkanal oder nicht stummgeschalten",
    UNDEAFENED_USER: "Du wurdest **nicht mehr stummgeschalten** vom Server **{guildName}**",
    UNDEAFENED: `**{undeafenUserTag}** wurde erfolgreich von der Stummschaltung aufgehoben. ${LOCALE.also_send_dm}`,
    CHAN_NOT_LOCK: "Dieser Kanal ist nicht gesperrt!",
    SUC_UNLOCK: "{channel} wurde erfolgreich entsperrt",
    NOT_MUTED: "Benutzer ist nicht stummgeschalten!",
    SUC_UNMUTE: "Stummschaltung von **{mutedMemberTag}** erfolgreich aufgehoben",
    CANNOT_RESET: "Kann das nicht zurücksetzen! Da kein Webhook für das Loggen vorhanden ist",
    SUC_RESET: "Logging erfolgreich zurückgesetzt!",
    STICKY_CLEAR: "Angepinnte Nachricht für **{channel}** entfernt",
    CAN_NOT_DISC: "Kann Verbindung von Benutzer nicht trennen.",
    NOT_IN_VOICE: "Benutzer ist im Moment in keinem Sprachkanal.",
    YOU_DISC: "Deine Verbindung wurde **getrennt** vom Server **{guildName}**, Grund: **{reason}**",
    USER_DISC: `Die Verbindung von **{kickUserTag}** wurde erfolgreich von **{kickUserVoiceChannel}**getrennt. Grund: **{reason}**. ${LOCALE.also_send_dm}`,
    USER_NOT_VOICE_OR_MUTED:
      "Benutzer ist im Moment in keinem Sprachkanal oder bereits stummgeschalten",
    YOU_MUTED: "Du wurdest **Stummgeschalten** vom Server **{guildName}**, Grund: **{reason}**",
    USER_MUTED: `**{muteUserTag}** wurde erfolgreich auf dem Server Stummgeschalten. Grund: **{reason}**. ${LOCALE.also_send_dm}`,
    USER_NOT_VOICE_OR_NOT_MUTED:
      "Benutzer ist im Moment in keinem Sprachkanal oder nicht stummgeschalten",
    YOU_UNMUTED: "Du wurdest **von der Stummschaltung entfernt** vom Server **{guildName}**",
    USER_SUC_UNMUTED: `**{unmuteUserTag}'s** Stummschaltung wurde erfolgreich aufgehoben. ${LOCALE.also_send_dm}`,
    USER_NOT_WARN: "Benutzer kann nicht verwarnt werden",
    USER_WARNED:
      "{memberTag} wurde mit folgendem Grund gewarnt: {reason} (Warnungen Insgesamt: {warningsTotal})",
    WARN_NOT_FOUND: "Warnung wurde nicht gefunden oder {memberTag} hat keine Warnungen",
    WARNING: "Warnung:",
    WARNED_ON: "Warnungen an:",
    MEMBER_WARNS: "{memberTag}'s Warnungen",
    TOTAL_WARNS: "Insgesamte Warnungen",
    USE_WARNS:
      "Benutze `{prefix}warnings <user> <warning number>` um mehr über eine spezifische Warnung zu erfahren",
    ROLE_NOT_FOUND: "Diese Rolle wurde nicht gefunden",
    GUILD_CONFIG: "{guildName}'s Konfiguration",
    ADD_TO_IGNORE: "Erfolgreich {item} zu den ignorierten Kanälen hinzugefügt",
  },
  TICKET: {
    CANNOT_DO_ACTION:
      "Diese Aktion kann in diesem Kanal, der kein Ticketkanal ist, nicht durchgeführt werden",
    CLOSING: "Das Ticket wird in 15 Sekunden geschlossen, schreibe `cancel` zum Abbrechen",
    WILL_NOT_CLOSE: "Dieses Ticket wird nicht geschlossen.",
    ALREADY_ACTIVE_TICKET: "Du hast bereits ein Aktives Ticket",
    TICKET_FOR: "Support Ticket für: {member}",
    CREATED: "Ticket erfolgreich erstellt!",
    NOT_ENABLED:
      "Tickets sind auf diesem Server nicht aktiviert! Ein Administrator kann diese in den Einstellungen von {botName} aktivieren",
    TICKET: "ticket-#{Id}",
  },
  EVENTS: {
    CHANNEL_CREATED: "Kanal erstellt",
    CHANNEL_CREATED_MSG: "{channel_type}: **{channel}** wurde erstellt",
    CHANNEL_DELETED: "Kanal gelöscht",
    CHANNEL_DELETED_MSG: "{channel_type}: **{channel}** wurde gelöscht",
    CHANNEL_RENAME_MSG: "{channel_type}: **{channel}** wurde zu **{new_channel}** umbenannt",
    CHANNEL_RENAME: "Kanal Umbenennung",
    CHANNEL_TOPIC_UPDATED: "Kanalthema aktualisiert",
    CHANNEL_TOPIC_UPDATED_MSG: "Kanalthema in Kanal: **{channel}** wurde aktualisiert",
    CHANNEL_OLD_TOPIC: "Altes Thema",
    CHANNEL_NEW_TOPIC: "Neues Thema",
    EMOJI_CREATED_MSG: "Emoji: {emoji} wurde erstellt",
    EMOJI_CREATED: "Neues Emoji erstellt",
    EMOJI_DELETED_MSG: "Emoji: **{emoji}** wurde gelöscht",
    EMOJI_DELETED: "Emoji gelöscht",
    EMOJI_RENAMED_MSG: "Emoji: **{emoji_name}** wurde zu **{new_name}** umbenannt ({emoji})",
    BANNED_MEMBER: "Gebannte Mitglieder",
    NOT_FOUND: "Nicht gefunden",
    BAN_ADD: "Mitglied gebannt",
    KICK_ADD: "Mitglied gekickt",
    EXECUTED_BY: "Ausgeführt von",
    REASON: "Grund",
    STARBOARD_MESSAGE: "{userTag}, diese Nachricht ist bereits in der Favoritenliste",
    STARBOARD_NOT_STAR: "{userTag}, du kannst keine leere Nachricht zu den Favoriten hinzufügen.",
  },
  MESSAGE: {
    USER_IS_AFK: "{tag} ist AFK!\n **Grund**: {reason}",
    NOT_AFK_ANYMORE: "{tag} ist nicht mehr AFK",
    BLACKLISTED: "Du darfst diesen Bot nicht benutzen, da du auf der Verbotsliste stehst.",
    CATEGORY_DISABLED:
      "Dieser Befehl ist deaktiviert, das der Server die Kategorie {category} deaktiviert hat",
    COMMAND_DISABLED: "Dieser Befehl ist auf diesem Server deaktiviert",
    OWNER_ONLY: "Dieser Befehl kann nur vom Besitzer ausgeführt werden!",
    INCORRECT_ARGS: "Der Befehl wurde falsch benutzt",
    REQUIRED_ARGS: "Du musst mehr Argumente angeben: {args}",
    COOLDOWN_AMOUNT: "Warte bitte **{time}** Sekunden bevor du den Befehl **{command}** benutzt",
    BAD_WORD:
      "{mention}, du hast ein verbotenes Wort benutzt, deswegen wurde deine Nachricht gelöscht",
    EXAMPLE: "Beispiel:",
    SUPPORT: "Support",
    NEED_PERMS: "Du benötigst: {perms} Berechtigungen",
    MUST_BE_DATE: "Dieses Argument muss ein **Datum** sein. z.B.: `1h`, `2days`, `5min`",
    MUST_BE_NUMBER: "Dieses Argument muss eine **Nummer** sein.",
  },
  OTHER: {
    REGIONS: {
      europe: ":flag_eu: Europa",
      "eu-west": ":flag_eu: Westeuropa",
      "eu-central": ":flag_eu: Mitteleuropa",
      brazil: ":flag_br: Brasilien",
      hongkong: ":flag_hk: Hongkong",
      india: ":flag_in: Indien",
      japan: ":flag_jp: Japan",
      russia: ":flag_ru: Russland",
      singapore: ":flag_sg: Singapur",
      southafrica: ":flag_za: Südafrika",
      sydney: ":flag_au: Sydney",
      frankfurt: ":flag_de: Frankfurt",
      "us-central": ":flag_us: Zentral-USA",
      "us-east": ":flag_us: Ost-USA",
      "us-west": ":flag_us: West-USA",
      "us-south": ":flag_us: Süd-USA",
      amsterdam: ":flag_nl: Amsterdam",
      dubai: ":flag_ae: Dubai",
      "south-korea": ":flag_kr: Südkorea",
      london: ":flag_gb: London",
    },
    MFA_LEVELS: {
      NONE: "Keines",
      ELEVATED: "Erweitert",
    },
    VERLEVELS: {
      NONE: "Keines",
      LOW: "Schwach",
      MEDIUM: "Mittel",
      HIGH: "Stark",
      VERY_HIGH: "Sehr stark",
    },
    ANSWERS: [
      "Ja.",
      "Nein.",
      "Meine Quellen sagen ja",
      "Sehr wahrscheinlich.",
      "ich weiß nicht",
      "irgendwann vielleicht",
      "Sieht gut aus.",
      "Die Zeichen stehen gut.",
      "Definitiv",
      "Absolut",
      "Nö.",
      "Nein danke, Ich werde das nicht schaffen.",
      "Auf keinen Fall!",
      "Das ist sicher.",
      "Es ist eindeutig so.",
      "Ohne Zweifel.",
      "Ja - Definitiv.",
      "Du kannst darauf vertrauen.",
      "Wie ich es sehe, ja.",
    ],
  },
  INVITE: {
    NOT_FOUND: "Diese Einladung wurde nicht gefunden.",
    NOT_EXPIRED_YET: "Diese Einladung ist noch nicht abgelaufen.",
    NOT_EXPIRE: "Diese Einladung läuft nicht ab",

    EXPIRATION: "Ablaufdatum",
    EXPIRES_AT: "Läuft ab am",
    EXPIRED_AT: "Abgelaufen am",
  },
};

export default LANG;
