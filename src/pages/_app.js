import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";
import "../dashboard/css/buttons.css";
import "../dashboard/css/nav.css";
import "../dashboard/css/modal.css";
import "../dashboard/css/landing.css";
import "../dashboard/css/footer.css";
import Head from "next/head";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import { useRouter } from "next/router";

function GhostyBot({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/" ? null : <Navbar />}
      <div className="container">
        <Head>
          <title>GhostyBot</title>
          <meta
            name="description"
            content="🤖 GhostyBot is a Custom Discord bot with a lot of commands for Discord communities. (+180 commands) Economy, util, fun, music, admin, xp system and more "
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicons/apple-touch-icon.png"
          />
          <meta property="og:image" content="/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#7289da" />
          <meta property="og:color" content="#7289da" />
        </Head>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
      {router.pathname === "/" ? null : <Footer />}
    </>
  );
}

export default GhostyBot;
