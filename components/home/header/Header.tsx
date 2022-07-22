import Image from "next/image";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GridViewIcon from "@mui/icons-material/GridView";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { Button, Input } from "@mui/material";

const Header = () => {
  const [highlightBtn, setHighlightBtn] = useState(0);
  const [language, setLanguage] = useState<"EN" | "BN">("EN");
  const [showSearchBtn, setShowSearchBtn] = useState(false);

  const secondMenus = ["All Products", "All Orders", "My Page", "Promote"];
  const mainMenus = ["All ads", "Loan", "Offer", "Bit"];

  function handleLanguage() {
    if (language === "BN") setLanguage("EN");
    else setLanguage("BN");
  }

  return (
    <>
      <div className='bg-white lg:border-b-2 md:w-[500px] lg:w-full mx-auto'>
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
              <button className='language-btn' onClick={handleLanguage}>
                {language}
              </button>
              <button className='notification-btn'>
                <MailIcon fontSize='small' />
                <span className='notification'>14</span>
              </button>
              <Button className='add-post-btn' size='small'>
                post ad
              </Button>
              <button className='auth-btn'>
                <ArrowDropDownIcon />
              </button>
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
          <div className="md:ml-24 lg:ml-0">
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
            {showSearchBtn && <Input color='warning' placeholder='Search' />}
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
