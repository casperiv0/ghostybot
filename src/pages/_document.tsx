import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class Ghostybot extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700;800&display=swap"
            as="style"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content={`🤖 ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} is an awesome Discord bot for Discord communities. (+200 commands) Economy, util, fun, music, admin, xp system and more`}
          />

          {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:color" content="#7289da" />
          <meta property="og:url" content="https://ghostybot.tk" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} - A Discord bot`} />
          <meta
            property="og:description"
            content={`🤖 ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} is an awesome Discord bot for Discord communities. (+200 commands) Economy, util, fun, music, admin, xp system and more`}
          />
          <meta property="og:image" content="https://ghostybot.tk/banner.png" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="ghostybot.tk" />
          <meta property="twitter:url" content="https://ghostybot.tk" />
          <meta name="twitter:title" content={`${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} - A Discord bot`} />
          <meta name="twitter:image" content="https://ghostybot.tk/banner.png" />
          <meta
            name="twitter:description"
            content={`🤖 ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} is an awesome Discord bot for Discord communities. (+200 commands) Economy, util, fun, music, admin, xp system and more`}
          />

          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#7289da" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Ghostybot;
