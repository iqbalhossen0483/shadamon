import * as React from "react";
import Box from "@mui/material/Box";
import SideMenu from "../../components/admin_page/Side_menu/SideMenu";
import { useRouter } from "next/router";
import Dashboard from "../../components/admin_page/dashboard/Dashboard";
import Users from "../../components/admin_page/users/Users";
import AllProducts from "../../components/admin_page/all_product/AllProducts";
import AllOrders from "../../components/admin_page/all_order/AllOrders";
import Loan from "../../components/admin_page/loan/Loan";
import Offers from "../../components/admin_page/offer/Offers";
import Category from "../../components/admin_page/category/Category";
import Location from "../../components/admin_page/location/Location";

export default function AdminDashboard() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === "/admin") {
      router.push("/admin?dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <Box className='admin-container' component='main' sx={{ flexGrow: 1 }}>
        {router.query.dashboard !== undefined && <Dashboard />}
        {router.query.users !== undefined && <Users />}
        {router.query.all_products !== undefined && <AllProducts />}
        {router.query.all_orders !== undefined && <AllOrders />}
        {router.query.loan !== undefined && <Loan />}
        {router.query.offer !== undefined && <Offers />}
        {router.query.add_category !== undefined && <Category />}
        {router.query.add_location !== undefined && <Location />}
      </Box>
    </Box>
  );
}
