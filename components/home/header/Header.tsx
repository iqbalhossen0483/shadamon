import Image from "next/image";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GridViewIcon from "@mui/icons-material/GridView";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
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
      <section className='header-container'>
        {/* logo */}
        <div className='lg:w-[60%]'>
          <Image width={150} height={33} src='/logo.png' alt='Logo' />
        </div>

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

        <hr className='col-span-4 hidden lg:block' />

        {/* second menu  */}
        <section className='header-second-menu'>
          {secondMenus.map((menu, index) => (
            <Button size='small' key={index}>
              {menu}
            </Button>
          ))}
        </section>
      </section>

      {/* header third menu  */}
      <section className='header-third-menu'>
        <div>
          <GridViewIcon /> Category
        </div>
        <div>
          <LocationOnIcon /> Location
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
      </section>
    </>
  );
};

export default Header;
