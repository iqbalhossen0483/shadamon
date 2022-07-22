import Metahead from "../components/shared/MetaHead/Metahead";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/home.css";
import "../styles/header.css";
import Header from "../components/home/header/Header";

type Props = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

function Layout({ Component, pageProps }: Props) {
  return (
    <>
      <Metahead />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout Component={Component} pageProps={pageProps} />;
}

export default MyApp;
