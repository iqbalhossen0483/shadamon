import * as React from "react";
import Box from "@mui/material/Box";
import SideMenu from "../../components/admin_page/Side_menu/SideMenu";

export default function AdminDashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
          deserunt, recusandae maiores id, perferendis reprehenderit, totam
          maxime cupiditate molestiae harum eligendi! Odit optio laboriosam,
          dolores doloremque cumque minima ad voluptatibus.
        </p>
      </Box>
    </Box>
  );
}
