import Metahead from "../components/shared/MetaHead/Metahead";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/home.css";

type Props = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

function Layout({ Component, pageProps }: Props) {
  return (
    <>
      <Metahead />
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout Component={Component} pageProps={pageProps} />;
}

export default MyApp;
