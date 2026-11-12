import { useEffect } from "react";
import "../styles/globals.css";
import Layout from "../components/Layout.js";
import ContextWrapper from "@/context/ContextWrapper";



// punto de entrada de next, envuelve TODA la app en Layout (navbar) y
// ContextWrapper (contexto de la agenda), y registra el service worker
// para las notificaciones push
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
  <ContextWrapper>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ContextWrapper>
  );
}
export default MyApp;