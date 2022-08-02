import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Spinner from "../../components/utilitize/Spinner";
import useStore from "../hooks/useStore";

const AdminRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!store?.auth.user) {
      router.push("/login");
      store?.State.setRedirectUrl("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.auth.user]);

  return store?.auth.user ? children : <Spinner />;
};

export default AdminRoute;
