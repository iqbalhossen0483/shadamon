import Metahead from "../components/shared/MetaHead/Metahead";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/home.css";
import "../styles/admin.css";
import "../styles/header.css";
import "../styles/product.css";
import "../styles/footer.css";
import "../styles/myAccount.css";
import "../styles/loginRegister.css";
import StoreProvider from "../context/provider/StoreProvider";
import LoginRegister from "../components/LoginRegister.tsx/LoginRegister";
import AlertProvider from "../context/provider/AlertProvider";
import Footer from "../components/footer/Footer";
import MyAccount from "../components/myAccount/MyAccount";
import { useRouter } from "next/router";
import AdminRoute from "../context/protected_route/AdminRoute";
import AddProduct from "../components/product/AddProduct";

type Props = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

function Layout({ Component, pageProps }: Props) {
  const router = useRouter();

  return (
    <>
      <Metahead />
      {router.pathname === "/admin" ? (
        <AdminRoute>
          <Component {...pageProps} />
        </AdminRoute>
      ) : (
        <Component {...pageProps} />
      )}
      {router.pathname !== "/admin" && <LoginRegister />}
      <MyAccount />
      <AlertProvider />
      <AddProduct />
      {router.pathname !== "/admin" && <Footer />}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout Component={Component} pageProps={pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
