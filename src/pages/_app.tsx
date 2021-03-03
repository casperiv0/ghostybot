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
