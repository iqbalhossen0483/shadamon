import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import React from "react";
import useStore from "../../../../context/hooks/useStore";

const Header = ({ title }: { title: string }) => {
  const store = useStore();

  return (
    <div className='admin-header-container'>
      <p>{title}</p>
      <main>
        <button className='bg-green-100 rounded-lg py-2 px-2 text-green-800'>
          <NotificationsNoneOutlinedIcon />
        </button>
        <Image
          height={40}
          width={50}
          src={store?.auth.user?.photoURL || "/no-picture-logo.jpg"}
          alt='User'
        />
        <div className='leading-4'>
          <p className='font-semibold'>{store?.auth.user?.displayName}</p>
          <p className='text-gray-500'>Developer</p>
        </div>
        <button className='px-1 border-x-2'>
          <PowerSettingsNewIcon />
        </button>
        <button>
          <ArrowForwardIcon />
        </button>
      </main>
    </div>
  );
};

export default Header;
