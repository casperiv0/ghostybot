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
            content={`🤖 ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} is a feature-rich Discord bot with +200 commands for Discord servers. Economy, util, fun, music, admin and more! Built with Next.js and Discord.js`}
          />

          {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:color" content="#5865f2" />
          <meta property="og:url" content="https://ghostybot.caspertheghost.me" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} - A Discord bot`}
          />
          <meta
            property="og:description"
            content={`🤖 ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} is a feature-rich Discord bot with +200 commands for Discord servers. Economy, util, fun, music, admin and more! Built with Next.js and Discord.js`}
          />
          <meta property="og:image" content="https://ghostybot.caspertheghost.me/banner.png" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="ghostybot.caspertheghost.me" />
          <meta property="twitter:url" content="https://ghostybot.caspertheghost.me" />
          <meta
            name="twitter:title"
            content={`${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} - A Discord bot`}
          />
          <meta name="twitter:image" content="https://ghostybot.caspertheghost.me/banner.png" />
          <meta
            name="twitter:description"
            content={`🤖 ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} is a feature-rich Discord bot with +200 commands for Discord servers. Economy, util, fun, music, admin and more! Built with Next.js and Discord.js`}
          />

          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#5865f2" />
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
