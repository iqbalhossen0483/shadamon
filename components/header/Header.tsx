import Image from "next/image";
import React, { useEffect, useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GridViewIcon from "@mui/icons-material/GridView";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { AppBar, Button, IconButton, Tooltip } from "@mui/material";
import useStore from "../../context/hooks/useStore";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import LanguageIcon from "@mui/icons-material/Language";
import { DebounceInput } from "react-debounce-input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [highlightBtn, setHighlightBtn] = useState(0);
  const [language, setLanguage] = useState<"EN" | "BN">("EN");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showheader, setShowHeader] = useState(true);
  const store = useStore();

  const secondMenus = ["All Products", "All Orders", "My Page", "Promote"];
  const mainMenus = ["All ads", "Loan", "Offer", "Bit"];

  function handleLanguage() {
    if (language === "BN") setLanguage("EN");
    else setLanguage("BN");
  }

  useEffect(() => {
    let oldScroll = 0;
    window.addEventListener("scroll", () => {
      if (window.scrollY > oldScroll) {
        setShowHeader(false);
        oldScroll = window.scrollY;
      } else {
        setShowHeader(true);
        oldScroll = window.scrollY;
      }
    });
  }, []);

  return (
    <div>
      <div className={`header-first-menu ${!showheader && "hidden"} lg:block`}>
        <section className='header-container'>
          {/* logo */}
          <div className='lg:w-[60%]'>
            <Image width={132} height={29} src='/logo.png' alt='Logo' />
          </div>

          <div className='flex justify-between'>
            {/* main menu */}
            <div className='main-menu'>
              {mainMenus.map((menu, index) => (
                <button
                  onClick={() => setHighlightBtn(index)}
                  className={highlightBtn === index ? "btn-highlight" : ""}
                  key={index}
                >
                  {menu}
                </button>
              ))}
            </div>

            {/* user menu */}
            <div className='user-menus'>
              <Tooltip className='loan-icon' title='Loan'>
                <IconButton>
                  <CurrencyExchangeIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <Tooltip className='bit-icon' title='Bit'>
                <IconButton>
                  <CurrencyBitcoinIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Language'>
                <button onClick={handleLanguage}>
                  <span className='hidden lg:block'>{language}</span>
                  <span className='lg:hidden'>
                    <LanguageIcon fontSize='small' />
                  </span>
                </button>
              </Tooltip>
              <Tooltip className='notification-btn' title='Notification'>
                <button>
                  <MailIcon fontSize='small' />
                  <span className='notification'>14</span>
                </button>
              </Tooltip>
              <Button className='add-post-btn' size='small'>
                post ad
              </Button>

              {/* login log out butn start */}
              <div className='hidden lg:block'>
                {store?.auth.user ? (
                  <Tooltip title='My Account'>
                    <IconButton
                      onClick={() => {
                        if (store.auth.user) {
                          store.State.setShowMyAccountPage(true);
                        } else {
                          store?.State.setShowLoginRegister(true);
                        }
                      }}
                    >
                      <AccountCircleIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title='LogIn'>
                    <IconButton
                      onClick={() => {
                        store?.State.setShowLoginRegister(true);
                      }}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
              {/* login log out butn end */}
            </div>
          </div>
        </section>
      </div>

      {/* second menu  */}
      {store?.auth.user && (
        <div className='bg-white mt-[54px] border-b-2 hidden lg:block'>
          <div className='header-second-menu'>
            <div className='hidden lg:block'></div>
            <div>
              {secondMenus.map((menu, index) => (
                <Button key={index}>{menu}</Button>
              ))}
            </div>
            <div className='hidden lg:block'></div>
          </div>
        </div>
      )}

      {/* header third menu  */}
      <div
        className={`header-third-menu ${
          showheader ? "top-[46px]" : "top-[0px]"
        }`}
      >
        <div className='hidden lg:block'></div>
        <main>
          <div>
            <GridViewIcon /> Categories
          </div>
          <div className='location'>
            <LocationOnIcon /> Locations
          </div>
          <div className='search-btn'>
            <p
              className='cursor-pointer'
              onClick={() => setShowSearchBtn(!showSearchBtn)}
            >
              <SearchIcon />
              {!showSearchBtn && <span>Search</span>}
            </p>
            {showSearchBtn && (
              <DebounceInput
                className='search-input'
                placeholder='Search'
                minLength={3}
                debounceTimeout={300}
                onChange={(event) => setSearchText(event.target.value)}
              />
            )}
          </div>
          <div className='lg:hidden ml-auto'>
            <SortIcon />
          </div>
        </main>
        <div className='hidden lg:block'></div>
      </div>
    </div>
  );
};

export default Header;
