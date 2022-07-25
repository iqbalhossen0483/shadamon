import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useStore from "../../context/hooks/useStore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import AppsIcon from "@mui/icons-material/Apps";
import GradingIcon from "@mui/icons-material/Grading";
import FlagIcon from "@mui/icons-material/Flag";
import CampaignIcon from "@mui/icons-material/Campaign";

const Footer = () => {
  const [highlight, setHighlight] = useState(1);
  const [showFooter, setShowFooter] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const store = useStore();

  useEffect(() => {
    let oldScroll = 0;
    window.addEventListener("scroll", () => {
      if (window.scrollY > oldScroll) {
        setShowFooter(true);
        oldScroll = window.scrollY;
      } else {
        setShowFooter(false);
        oldScroll = window.scrollY;
      }
    });
  }, []);

  return (
    <>
      {/* footer user menus start */}
      <div
        className={`footer-user-menu ${
          !showUserMenu || showFooter ? "hidden" : "lg:hidden"
        }`}
      >
        <div>
          <button>
            <AppsIcon />
            <p>All Post</p>
          </button>
          <button>
            <GradingIcon />
            <p>All Order</p>
          </button>
        </div>
        <div onClick={() => setShowUserMenu(false)} className='down-icon'>
          <button>
            <KeyboardArrowDownIcon />
          </button>
        </div>
        <div>
          <button>
            <FlagIcon />
            <p>My Page</p>
          </button>
          <button>
            <CampaignIcon />
            <p>Promote</p>
          </button>
        </div>
      </div>
      {/* footer user menu end */}

      {/* footer main menus start */}
      <div
        className={`footer-main-menu ${showFooter ? "hidden" : "lg:hidden"} ${
          !showUserMenu ? "rounded-t-2xl" : "border-t"
        }`}
      >
        <button
          onClick={() => setHighlight(1)}
          className={highlight === 1 ? "bg-gray-200" : ""}
        >
          <HomeIcon />
          <p>Home</p>
        </button>
        <button
          onClick={() => setHighlight(2)}
          className={highlight === 2 ? "bg-gray-200" : ""}
        >
          <SearchIcon />
          <p>Search</p>
        </button>

        <button
          onClick={() => {
            if (store?.auth.user) {
              setShowUserMenu((prev) => !prev);
            } else {
              store?.State.setShowLoginRegister(true);
            }
          }}
          className='plus-icon'
        >
          {store?.auth.user ? (
            <Image height={32} width={32} src='/footer-icon.png' alt='icon' />
          ) : (
            <AddIcon fontSize='large' />
          )}
        </button>

        <button
          onClick={() => setHighlight(3)}
          className={`notification-btn ${highlight === 3 && "bg-gray-200"}`}
        >
          <MailIcon fontSize='small' />
          <p>Inbox</p>
          <span className='notification'>14</span>
        </button>
        <button
          onClick={() => {
            setHighlight(4);
            if (store?.auth.user) {
              store?.State.setShowMyAccountPage(true);
            } else {
              store?.State.setShowLoginRegister(true);
            }
          }}
          className={highlight === 4 ? "bg-gray-200" : ""}
        >
          <AccountCircleIcon />
          <p>My</p>
        </button>
      </div>
      {/* footer main menus end */}
    </>
  );
};

export default Footer;
