import "../styles/globals.css";
import Layout from "../components/Layout.js";
import ContextWrapper from "@/context/ContextWrapper";


function MyApp({ Component, pageProps }) {
  return (
  <ContextWrapper>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ContextWrapper>
  );
}
export default MyApp;