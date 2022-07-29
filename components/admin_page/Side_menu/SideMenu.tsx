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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

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
    { text: "Dashboard", icon: DashboardIcon, type: "normal" },
    { text: "Users", icon: PeopleIcon, type: "normal" },
    { text: "All Products", icon: InventoryIcon, type: "normal" },
    { text: "All Orders", icon: BusinessCenterIcon, type: "normal" },
    { text: "Loan", icon: CreditScoreIcon, type: "normal" },
    { text: "Offer", icon: CardGiftcardIcon, type: "normal" },
    {
      text: "Setting",
      icon: SettingsIcon,
      type: "collaps",
      subMenus: [
        { text: "Add Category", icon: CategoryIcon },
        { text: "Add Location", icon: AddLocationAltIcon },
      ],
    },
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
          <React.Fragment key={Menu.text}>
            {Menu.type === "normal" ? (
              <Button onClick={() => handleRouter(Menu.text)} fullWidth>
                <Menu.icon />
                {open && <p className='text-left w-[70%]'>{Menu.text}</p>}
              </Button>
            ) : (
              <Accordion className='collaps'>
                <AccordionSummary
                  className='collaps-summery'
                  sx={{ padding: 0 }}
                  expandIcon={open && <ExpandMoreIcon />}
                >
                  <Button fullWidth>
                    <Menu.icon />
                    {open && <p className='text-left w-[70%]'>{Menu.text}</p>}
                  </Button>
                </AccordionSummary>
                <Divider className='bg-gray-600' />
                <AccordionDetails
                  sx={{ padding: `0 ${!open ? "3px" : "24px"}` }}
                >
                  {Menu.subMenus?.map((Submenu) => (
                    <Button
                      key={Submenu.text}
                      onClick={() => handleRouter(Submenu.text)}
                      fullWidth
                    >
                      <Submenu.icon />
                      {open && (
                        <p className='text-left w-[70%]'>{Submenu.text}</p>
                      )}
                    </Button>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default SideMenu;
