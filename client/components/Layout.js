import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import styles from '../modules/Layout.module.css'
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  // creamos una lista de las rutas donde NO quiero que aparezca el navbar
  const noNavbarRoutes = ['/'];

  // verificamos si la ruta actual esta dentro de la lista de rutas condicionadas
  const hideNavbar = noNavbarRoutes.includes(router.pathname);

  return (
    <>
      <Head>
        <title>Soportes Basani</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={styles.mainContainer}>
      {!hideNavbar && <Navbar/>}
      <main>{children}</main>
    </div>
  </>
  );
};
export default Layout;