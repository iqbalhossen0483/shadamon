import Image from "next/image";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GridViewIcon from "@mui/icons-material/GridView";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { Button, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import useStore from "../../context/hooks/useStore";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import LanguageIcon from "@mui/icons-material/Language";
import { DebounceInput } from "react-debounce-input";

const Header = () => {
  const [highlightBtn, setHighlightBtn] = useState(0);
  const [language, setLanguage] = useState<"EN" | "BN">("EN");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const store = useStore();

  const secondMenus = ["All Products", "All Orders", "My Page", "Promote"];
  const mainMenus = ["All ads", "Loan", "Offer", "Bit"];

  function handleLanguage() {
    if (language === "BN") setLanguage("EN");
    else setLanguage("BN");
  }

  async function singOut() {
    if (store) {
      const { error } = await store.auth.singOut();
      if (error) {
        store.State.setAlert({ msg: "An error occured", type: "error" });
      }
    }
  }
  console.log(store?.auth.isfacebookLogin);

  return (
    <>
      <div className='header-first-menu'>
        <section className='header-container'>
          {/* logo */}
          <div className='lg:w-[60%]'>
            <Image width={150} height={33} src='/logo.png' alt='Logo' />
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
              {store?.auth.user &&
              (store?.auth.user?.emailVerified ||
                store?.auth.user?.phoneNumber ||
                store.auth.isfacebookLogin) ? (
                <Tooltip title='LogOut'>
                  <IconButton onClick={singOut}>
                    <LogoutIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='LogIn'>
                  <IconButton
                    onClick={() => {
                      store?.State.setShowLoginRegister(true);
                      store?.State.setShowLoginPage(false);
                    }}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                </Tooltip>
              )}
              {/* login log out butn end */}
            </div>
          </div>
        </section>
      </div>

      {/* second menu  */}
      <div className='bg-white border-b-2 hidden lg:block'>
        <section className='header-second-menu'>
          <div className='hidden lg:block'></div>
          <div>
            {secondMenus.map((menu, index) => (
              <Button key={index}>{menu}</Button>
            ))}
          </div>
          <div className='hidden lg:block'></div>
        </section>
      </div>

      {/* header third menu  */}
      <section className='header-third-menu'>
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
      </section>
    </>
  );
};

export default Header;
