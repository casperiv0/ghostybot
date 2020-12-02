import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";
import "../dashboard/css/buttons.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Head>
        <title>GhostyBot</title>
      </Head>
      <div className="content">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
