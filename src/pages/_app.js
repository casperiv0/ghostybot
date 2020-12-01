import "../dashboard/css/index.css";
import "../dashboard/css/cards.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <div className="content">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
