const LANG: typeof import("./english").default = {
  GLOBAL: {
    EVERYONE: "Everyone",
    NOT_SPECIFIED: "غير محدد",
    ERROR: "حدث خطأ ما",
    NAME: "الاسم",
    SUCCESS: "تم",
    REASON: "السبب",
    URL: "URLعنوان ",
    NONE: "بلا",
    YES: "نعم",
    NO: "لا",
  },
  GUILD: {
    NOT_FOUND: "لم يتم العثور علي السرفر",
    LEFT: "لقد غادرت  **${guild_name}**",
    OWNER: "اونر السرفر",
    CHANNEL_C: "عدد القنوات",
    EMOJI_C: "عدد الايموجيات",
    ROLES_C: "عدد الرولات",
    MEMBER_C: "عدد الاعضاء",
    REGION: "Region",
    VERIFICATION: "مستوي الحماية",
    MFA: "MFA Level",
  },
  MEMBER: {
    BANNER: "Banner",
    TAG: "علامة",
    ROLES: "الرولات",
    BADGES: "شارات",
    ONLINE: "متصل",
    OFFLINE: "غير متصل",
    STATUS: "الحالة",
    CREATED_ON: "تم انشائه بتاريخ",
    JOINED_AT: "انضم بتاريخ",
    NICKNAME: "اللقب",
    NOT_FOUND: "هذا الشخص غير موجود",
    CANNOT_BE_BANNED: "لا يمكنك تبنيد هذا الشخص",
    DM_BAN_MESSAGE: "لقد تم تبنيدك  **banned**من **{guild_name}**, السبب: **{ban_reason}**",
    GUILD_BAN_MESSAGE:
      "{member} لقد تم تبنيده بنجاح . السبب: **{ban_reason}**. لقد قمت بارسال رسالة اليه .",
    BOT_DATA: "Bot data does not save, therefore I cannot fetch his data",
    PERMISSIONS: "Permissions",
  },
  ROLES: {
    MY_ROLE_NOT_HIGH_ENOUGH: "رتبتي ليست اعلي من رول  **{role}** ",
    MY_ROLE_MUST_BE_HIGHER: "يجب ان تكون رتبتي اعلي من  **{member}** ",
    ALREADY_HAS_ROLE: "هذا المستخدم يمتلك هذه الرتبة بالفعل ",
    ADDED_ROLE_TO: "تم اعطاء رول  **{role}** الي {member} بنجاح",
  },
  IMAGE: {
    CLICK_TO_VIEW: "[اضغط هنا اذا لم يتم تحميل الصورة]",
    CLYDE: "كلايد",
    CUDDLES: "كلود مع ",
    FEEDED: "اطعم",
    HUGGED: "عانق",
    PATTED: "قام بملاطفة",
    KISSED: "قام بتقبيل ",
    POKED: "قام بوخز",
    SLAPPED: "قام بصفع",
    NO_GIPHY_KEY: "No giphy api was found in the config (contact the bot owner)",
    NO_GPIHY_FOUND: "No gifs were found with that",
  },
  BOT_OWNER: {
    EVAL: "Eval command",
    EVAL_TYPE: "النوع",
    EVAL_INPUT: "الادخال",
    EVAL_OUTPUT: "الاخراج",
    CANNOT_BL_OWNER: "لا يمكن اعطاء اونر البوت قائمة سوداء",
    CANNOT_BL_BOT: "The bot cannot be blacklisted",
    NOT_BLD: "هذا المستخدم ليس بالقائمة السوداء",
    ALREADY_BLD: "{member} بالفعل بالقائمة السوداء",
    NOT_OPTION: "**{type}** ليس خيارا صحيحاً",
    BLACKLISTED: "blacklisted",
    UNBLACKLISTED: "unblacklisted",
    BLACKLISTED_SUCCESS: "{member} كان {type}",
  },
  LEVELS: {
    XP: "خبرة",
    LEVEL: "المستوي",
    LEADERBOARD: "قائمة المستويات",
    GIVE_XP_SUCCESS: "تم اعطاء  **{member}** **{amount}**خبرة بنجاح",
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
    MUST_BE_IN_VC: "يجب ان تكون بقناة صوتية",
    BOT_NOT_IN_VC: "Bot is not in this voice channel!",
    NO_QUEUE: "ليس هناك شيئ لتشغيله",
    QUEUE_CLEARED: "تم حذف القائمة",
    QUEUE: "قائمة الموسيقيlume",
    BETWEEN_0_100: "يجب ان يكون الصوت بين 0 و 100",
    BETWEEN_1_TOTALQUEUE: "Use a track number between 1 and {totalQueue}",
    REMOVE_SUCCESS: "has been removed from the queue",
    VOL_SUCCESS: "تم ضبط الصوت الي {vol}%",
    PLAYING: "جاري التشغيل",
    PAUSED: "تم الايقاف",
    DURATION: "التوقيت",
    ADDED_TO_QUEUE: "{song} has been added to the queue",
    ADDED_TO_QUEUE2: "Song has been added to the queue",
    ADDED_PL_TO_QUEUE: "Playlist: {name} was added to queue ({length} songs)",
    NOW_PLAYING: "جاري التشغيل:",
    REQUESTED_BY: "{user} بواسطة",
    NO_PERMS: "لا امتلك صلاحيات لهذه القناة الصوتية",
    NO_RESULTS: "No songs were found",
    SUC_REM_FILTER: "Successfully removed {filter}",
    SUC_APPLIED_FILTER: "Successfully applied {filter}",
    FILTER_NOT_FOUND: "That filter was not found",
    FILTER_ALREADY_ENABLED: "Filter `{filter}` is already enabled",
    FILTER_NOT_ENABLED: "Filter `{filter}` is not enabled?",
    NOT_VALID_OPTION: "{option} Is not a valid option `set`, `remove`",
    NO_LIRYCS: "No lyrics found for {songTitle}.",
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
    MONEY: "المال",
    BANK: "البنك",
    BALANCE: "الرصيد",
    DAILY_ERROR: "لقد استلمت بالفعل الراتب اليومي",
    WEEKLY_ERROR: "لقد استلمت بالفعل الراتب الاسبوعي",
    DAILY_SUCCESS: "لقد تم اضافة الراتب اليومي اليك وهو  **{amount}** كوينز",
    WEEKLY_SUCCESS: "لقد تم اضافة الراتب الاسبوعي اليك وهو **{amount}** كوينز",
    STORE_EMPTY:
      "There are no items in the store! Ask an admin to add items to the store via the dashboard.",
    PROVIDE_ITEM_TO_BUY: "من فضلك ادخل الغرض المراد اضافته للمتجر",
    NOT_ENOUGH_MONEY: "انت لا تمتلك الرصيد الكافي لشراء ذلك",
    BUY_SUCCESS: "تم شراء **{item}** المبلغ **{price}**",
    NOT_FOUND_STORE: "**{query}** wasn't found in the store.",
    ALREADY_OWN_ITEM: "انت بالفعل تمتلك هذا الغرض ",
    DEPOSITED_ALL: "تم ادخار جميع اموالك بنجاح",
    DEPOSITED_AMOUNT: "تم ادخار **{amount} كوينز**",
    WITHDRAW_ALL: "لقد سحبت جميع اموالك بنجاح",
    WITHDRAW_AMOUNT: "لقد قمت بسحب  **{amount}كوينز **",
    PROFILE: "الملف الشخصي",
    INVENTORY: "المخزن",
    INV_ITEMS: "اغراض  بالمخزن",
    VIEW_INVENTORY: "استخدم `{prefix}inventory <user>` لعرض جميع ممتلكاته",
    MONEY_LEADERBOARD: "قائمة متصدرين الاموال",
    TOTAL_BALANCE: "اجمالي الرصيد",
    BOTH_COUNTED: "تم احتساب كل من الرصيد والبنك",
    DICE_LANDED: "لقد حصلت علي : {roll}",
    DICE_WON: "تهانينا لقد فزت ب **{price}كوينز**",
    DICE_LOST: "تحتاج الي الرقم **6* لتفوز ب **{price}كوينز**",
    RECENTLY_WORKED: "لقد حصلت علي عملك اليومي مسبقا, {time} الوقت المتبقي",
    WORKED: "{member} عمله لليوم هو  **{job_name}** ولقد حصل علي  **{amount}**!",
    CANNOT_PAY_SELF: "لا يمكنك الدفع لنفسك",
    PAY_SUCCESS: "تم اعطاء  **{member}** **{amount}كوينز **",
    CANNOT_ROB_SELF: "لا يمكنك سرقة نفسك",
    BETWEEN_1_1000: "يجب ان يكون المبلغ بين 1 و 1000",
    MEMBER_NO_MONEY: "لا يملك المستخدم اي اموال لذلك لا يمكنك سرقته.",
    ROB_SUCCESS: "تمت السرقة **{amount}كوينز ** من **{member}**",
    STORE: "المتجر",
    MANAGE_STORE_PERMS: "انت لا تمتلك الصلاحيات الكافية  (Manage Server)",
    PROVIDE_VALID_ITEM: "من فضلك اختر غرض صحيح add/remove!",
    PRICE: "السعر",
    ALREADY_EXISTS: "**{item}** بالفعل متواجد بالمتجر",
    PROVIDE_PRICE: "من فضلك ادخل السعر ",
    MUST_BE_NUMBER: "المبلغ يجب ان يكون رقم!",
    ADDED_TO_STORE: "الي المتجر {item} تم اضافة",
    NOT_IN_STORE: "**{item}** غير موجود بالمتجر",
    REMOVED_FROM_STORE: "من المتجر {item} تمت ازالة ",
    WON_SLOTS: "You won and got {amount} coins",
    LOST_SLOTS: "You lost!",
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
    INV_EMPTY: "User's inventory is empty",
    REMOVED_MONEY: "Successfully removed {amount} from user balance",
    ALREADY_WORKED: "You have already worked recently. Check back {time}",
  },
  GAMES: {
    BETS_ON: "{member_1} يراهن علي {member_2}",
    LOST_BET: "{member_1} راهن علي {member_2}!\n {member_1} لم يفز بالمراهنة",
    WON_BET: "{member_1} bet on {member_2} و {member_1} فاز بالمراهنة",
    CALC: "حاسبة",
    INVALID_CALC: "حساب غير صحيح",
    COMPLIMENT: "جمع",
    LANDED_TAILS: "لقد هبطت علي صورة",
    LANDED_HEADS: "لقد هبطت علي رأس",
    HAPPINESS: "السعادة",
    IQ_TEST: "اختبار الذكاء",
    IQ_IS: "معدل ذكائك هو: {iq}",
    RPS: "حجر ورقة مقص",
    ROCK: "حجر",
    PAPER: "ورقة",
    SCISSORS: "مقص",
    WYR: "هل تفضل ؟",
    ANSWER: "الاجابة",
    QUESTION: "السؤال",
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
    AVATAR: "االافاتار",
    NOT_AFK: "تم الغاء تفعيل نظام ال AFK",
    AFK: "تم تشغيل نظام ال AFK",
    BMI_WEIGHT: "الوزن",
    BMI_HEIGHT: "الطول",
    BMI: "التناسق",
    SUPPORT_SERVER: "سرفر الدعم الفني",
    BUG_REPORT: "{member} has reported a bug",
    BUG_REPORTED: "Bug report was send!",
    CHANNEL_TOPIC: "وصف القناة",
    NO_DEF_FOUND: "لم يتم العثور علي تعريف لل  {word}",
    DEF_FOR_WORD: "تعريف ال {word}",
    CATEGORY: "كتاجري",
    DEFINITION: "التعريف",
    ANIMATED: "متحركة",
    NON_ANIMATED: "غير متحركة",
    NEW_FEEDBACK: "ملاحظة جديدة",
    FEEDBACK_SEND: "تم ارسال الملاحظة بنجاح",
    GH_NOT_FOUND: "حساب الجيت هب هذا ليس موجودا",
    GH_FOLLOWING: "يتابع",
    GH_FOLLOWERS: "المتابعون",
    GH_WEBSITE: "الموقع الالكتروني",
    GH_LOCATION: "الموقع",
    GH_BIO: "Bio",
    DB_RATINGS: "التقييمات",
    DB_COUNTRY: "البلد",
    DB_GENRES: "الانواع",
    DB_AWARDS: "الجوائز",
    DB_LANGS: "اللغات",
    POPULATION: "Population",
    DB_RELEASED: "تم الاصدار",
    DB_NOT_FOUND: "لم يتم العثور علي فيلم   {search}",
    PLAYERS: "اللاعبين",
    VERSION: "الاصدار",
    PORT: "Port",
    DESCRIPTION: "الوصف",
    NPM_NOT_FOUND: "No NPM packages were found with **{query}**",
    MC_NOT_FOUND: "السرفر غير موجود",
    NPM_SEARCH: "NPM بحث",
    NPM_TOP_5: "تم العثور علي اعلي 5 تقييمات**{query}**",
    AUTHOR: "المؤلف",
    VIEW_ON_NPM: "العرض علي npm",
    MAX_PLAYERS: "اقصي عدد لاعبين",
    PS_NOT_FOUND: "لم يتم العثور علي هذا التطبيق",
    DEVELOPER: "المطور",
    SCORE: "النتيجة",
    CREATED_BY: "بواسطة {member}",
    MENTIONABLE: "المنشن",
    POSITION: "Position (from top)",
    ROLE_NOT_FOUND: "لم يتم العثور علي الرول",
    ROLES: "الرولات",
    NO_GUILD_ICON: "هذا السرفر لا يملك صورة",
    ENLARGED_EMOJI: "النسخة المكبرة من  {emoji}",
    INVALID_EMOJI: "ايموجي غير صالح",
    SKIN_NOT_FOUND: "للاعب `{search}` لا يوجد",
    SKIN_NAME: " سكين اللاعب {name}",
    DOWNLOAD_SKIN: "[تحميل الاسكين]",
    G_TRANSLATE: "ترجمة جوجل",
    NEW_SUGGESTION: "اقتراح جديد",
    NO_SUGG_CHANNEL: "لا يمتلك سرفرك قناة للاقتراحات من فضلك قم بتعيين القناة اولا",
    UPTIME: "{member} يعمل منذ  {time}",
    BOT_UPTIME: "Bot has been up since: {botUpSince}",
    WEATHER: "الطقس",
    MAIN: "الرئسية",
    CURRENT: "الحالي",
    CURRENT_TEMP: "درجة الحرارة الحالية",
    FEELS_LIKE: "التوقعات",
    WIND_SPEED: "سرعة الرياح",
    WIND_DEGREES: "درجات الرياح",
    COUNTRY: "الدولة",
    NO_W_FOUND: "لم يتم العثور علي نتائج",
    DOC_NOT_FOUND: "That was not found on the docs",
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
    C_NOT_FOUND: "City: **{query}** was not found!",
    MDN_NOT_FOUND: "No results found for that query",
    UNKNOWN: "Unknown",
    PASTE_INVALID_FORMAT:
      "An invalid format was requested, valid types: https://pastebin.com/doc_api#5",
    SENT_SUG: "Sent suggestion 👍",
    ALREADY_VERIFED: "You are already verified",
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
    GUILDS: "السرفرات",
    CHANNELS: "القنوات",
    USERS: "المستخدمين",
    COMMAND_COUNT: "عدد الاوامر",
    INFO_2: "بيانات البوت",
    INFO: "بيانات البوت",
    SYSTEM_INFO: "بيانات النظام",
    RAM_USAGE: "استخدام الرام",
    UPTIME: "وقت التشغيل",
    DJS_V: "Discord.js نسخة",
    NODE_V: "NodeJS نسخة",
    REPO: "المستودع",
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
    CAT_NOT_EXIST: "الكتاجري هذا غير مدرج",
    CMD_NOT_FOUND: "الامر او الاختصار غير موجود",
    FULL_CMD_LIST: "View full detail command list",
    CLICK_ME: "Click me",
    COMMANDS: "الاوامر",
    COOLDOWN: "وقت التهدئة",
    ALIASES: "الاختصارات",
    USAGE: "الاستخدام",
    COMMAND: "الامر",
    OPTIONS: "الخيارات",
    OWNER_ONLY: "لا يمكن عرض الاوامر هذه للمستخدمين",
    CUSTOM_CMD: "This is a custom command, therefore I cannot show more info",
    BOT_PERMS: "Bot Permissions",
    MEMBER_PERMS: "Member Permissions",
    DEPRECATED:
      "**Note: Regular are considered deprecated for GhostyBot. We're working hard to transition the last batch of regular commands to slash commands.**",
    CATEGORIES: {
      admin: "اوامر الادمنز",
      animal: "اوامر الحيوانات",
      "bot-owner": "اوامر اونر البوت",
      games: "اوامر الالعاب",
      image: "اوامر الصورة",
      music: "اومر الميوزك",
      util: "الاوامر العامة",
      economy: "الاوامر الاقتصادية",
      levels: "اوامر الفلات",
      exempt: "أوامر الاستثناء (الأوامر التي لا يمكن تعطيلها)",
      disabled: "Disabled commands (this guild only)",
      giveaway: "Giveaway commands",
      reminder: "Reminder commands",
      custom: "Custom commands",
      ticket: "Ticket commands",
    },
  },
  POKEMON: {
    SPECIES: "النوع",
    ABILITIES: "القدرات",
    HEIGHT: "الطول",
    WEIGHT: "الوزن",
    EXPERIENCE: "الخبرة",
    GENDER: "الجنس",
    EGG_GROUPS: "مجموعات البيض",
    FAMILY: "العائلة",
    EVO_STAGE: "مرحلة التطور",
    EVO_LINE: "خط التطور",
    STATS: "الحالة",
    HP: "نقاط الصحة",
    ATTACK: "الهجوم",
    DEFENSE: "الدفاع",
    SP_ATK: "SP ",
    SP_DEF: "SP DEF",
    SPEED: "السرعة",
    TOTAL: "الاجمالي",
    NOT_FOUND: "لم يتم العثور علي {query}. من فضلك تحقق من التهجئة الصحيحة وحاول مرة اخري",
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
    SUCCES_MUTED: "{muteMemberTag} was successfully muted for {time}. Reason: **{reason}**",
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
    STARBOARD_MESSAGE: "{userTag}, this message is already in the starboard",
    STARBOARD_NOT_STAR: "{userTag}, you cannot star an empty message.",
    CHANNEL_TOPIC_UPDATED: "Channel Topic Updated",
    CHANNEL_TOPIC_UPDATED_MSG: "Channel topic in channel: **{channel}** was updated",
    CHANNEL_OLD_TOPIC: "Old Topic",
    CHANNEL_NEW_TOPIC: "New Topic",

    STICKER_CREATED: "New Sticker Created",
    STICKER_DELETED_MSG: "A sticker was deleted",
    STICKER_DELETED: "Sticker Deleted",
    STICKER_UPDATED: "Sticker updated",
    NAME_UPDATED: "Name updated",
    DESCRIPTION_UPDATED: "Description updated",
  },
  MESSAGE: {
    USER_IS_AFK: "{tag} is AFK!\n **Reason**: {reason}",
    NOT_AFK_ANYMORE: "{tag} is not AFK anymore",
    BLACKLISTED: "You're blacklisted from using this bot.",
    CATEGORY_DISABLED:
      "That command is disabled because this guild disabled the {category} category",
    COMMAND_DISABLED: "That command was disabled for this guild",
    OWNER_ONLY: "This command can only be used by the owners!",
    INCORRECT_ARGS: "Incorrect command usage",
    REQUIRED_ARGS: "You must provide more args: {args}",
    COOLDOWN_AMOUNT: "Please wait **{time}** more seconds before using the **{command}** command",
    BAD_WORD:
      "{mention}, you used a bad word the admin has set, therefore your message was deleted",
    EXAMPLE: "Example:",
    SUPPORT: "Support",
    NEED_PERMS: "You need: {perms} permissions",
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
    VERLEVELS: {
      NONE: "None",
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
      VERY_HIGH: "Very High",
    },
    MFA_LEVELS: {
      NONE: "None",
      ELEVATED: "Elevated",
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
      " It is certain.",
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
