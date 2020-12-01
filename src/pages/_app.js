import "../dashboard/css/index.css";

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
