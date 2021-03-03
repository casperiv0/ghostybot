import Head from "next/head";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";
import "../dashboard/css/buttons.css";
import "../dashboard/css/nav.css";
import "../dashboard/css/modal.css";
import "../dashboard/css/landing.css";
import "../dashboard/css/footer.css";
import "../dashboard/css/switch.css";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import { dashboard } from "../../config.json";
import Loader from "../dashboard/components/Loader";

const paths = ["/error", "/"];

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function GhostyBot({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading === true) {
    return <Loader full />;
  }

  return (
    <>
      {paths.includes(router.pathname) ? null : <Navbar />}
      <div className="container">
        <Head>
          <title>{dashboard.botName} - A Discord bot</title>
          <meta
            name="description"
            content={`🤖 ${dashboard.botName} is an awesome Discord bot for Discord communities. (+200 commands) Economy, util, fun, music, admin, xp system and more`}
          />

          {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:color" content="#7289da" />
          <meta property="og:url" content="https://ghostybot.tk" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${dashboard.botName} - A Discord bot`} />
          <meta
            property="og:description"
            content={`🤖 ${dashboard.botName} is an awesome Discord bot for Discord communities. (+200 commands) Economy, util, fun, music, admin, xp system and more`}
          />
          <meta property="og:image" content="https://ghostybot.tk/banner.png" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="ghostybot.tk" />
          <meta property="twitter:url" content="https://ghostybot.tk" />
          <meta name="twitter:title" content={`${dashboard.botName} - A Discord bot`} />
          <meta
            name="twitter:description"
            content={`🤖 ${dashboard.botName} is an awesome Discord bot for Discord communities. (+200 commands) Economy, util, fun, music, admin, xp system and more`}
          />
          <meta name="twitter:image" content="https://ghostybot.tk/banner.png" />

          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon.png" />
          <meta property="og:image" content="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#7289da" />
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
      {paths.includes(router.pathname) ? null : <Footer />}
    </>
  );
}

export default GhostyBot;
