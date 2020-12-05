import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";
import "../dashboard/css/buttons.css";
import "../dashboard/css/nav.css";
import "../dashboard/css/modal.css";
import "../dashboard/css/landing.css";
import Head from "next/head";
import Navbar from "../dashboard/components/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/" ? null : <Navbar />}
      <div className="container">
        <Head>
          <title>GhostyBot</title>
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicons/apple-touch-icon.png"
          />
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
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
