import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import MuiDrawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//main function
const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const menus = [
    { text: "Dashboard", icon: DashboardIcon },
    { text: "Users", icon: PeopleIcon },
    { text: "All Products", icon: InventoryIcon },
    { text: "All Orders", icon: BusinessCenterIcon },
    { text: "Loan", icon: CreditScoreIcon },
    { text: "Offer", icon: CardGiftcardIcon },
  ];

  function handleRouter(text: string) {
    router.push("?" + text.toLowerCase().replace(" ", "_"));
  }

  return (
    <Drawer variant='permanent' open={open} className='drawer-header-container'>
      <DrawerHeader>
        {open ? (
          <IconButton className='left-icon' onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton
            color='inherit'
            className='ml-[0.4px]'
            aria-label='open drawer'
            onClick={() => setOpen(true)}
            edge='start'
          >
            <MenuIcon />
          </IconButton>
        )}
        {open && <h2 className='text-xl font-semibold'>SHADAMON</h2>}
      </DrawerHeader>
      <Divider className='bg-gray-600' />

      <div className='menus mt-3 '>
        {menus.map((Menu) => (
          <Button
            onClick={() => handleRouter(Menu.text)}
            fullWidth
            key={Menu.text}
          >
            <Menu.icon />
            {open && <p className='text-left w-[70%]'>{Menu.text}</p>}
          </Button>
        ))}
      </div>
    </Drawer>
  );
};

export default SideMenu;
