import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";
import "../dashboard/css/buttons.css";
import "../dashboard/css/nav.css";
import Head from "next/head";
import Navbar from "../dashboard/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className="container">
        <Head>
          <title>GhostyBot</title>
        </Head>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
