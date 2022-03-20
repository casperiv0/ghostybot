import * as React from "react";
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
import { Navbar } from "@components/Navbar";
import { Footer } from "@components/Footer";
import { Loader } from "@components/Loader";

const paths = ["/error", "/"];

function GhostyBot({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    function handleRouteStart() {
      NProgress.start();
    }
    function handleRouteDone() {
      NProgress.done();
    }

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const locale = window.localStorage.getItem("bot_locale");
      if (locale === router.locale) return;
      if (!locale) return;

      router.push(locale);
    }
  }, [router]);

  if (loading) {
    return <Loader full />;
  }

  return (
    <>
      {paths.includes(router.pathname) ? null : <Navbar />}
      <div className="container">
        <Head>
          <title>{process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} - A Discord bot</title>
        </Head>
        <div className={`content ${router.pathname === "/" && "footer-content"}`}>
          <Component {...pageProps} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default appWithTranslation(GhostyBot);
