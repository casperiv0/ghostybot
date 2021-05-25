import Head from "next/head";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import NProgress from "nprogress";
import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";
import "../dashboard/css/buttons.css";
import "../dashboard/css/nav.css";
import "../dashboard/css/modal.css";
import "../dashboard/css/landing.css";
import "../dashboard/css/footer.css";
import "../dashboard/css/switch.css";
import "../dashboard/css/nprogress.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Loader from "@components/Loader";

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
          <title>{process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} - A Discord bot</title>
        </Head>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
      {paths.includes(router.pathname) ? null : <Footer />}
    </>
  );
}

export default appWithTranslation(GhostyBot);
