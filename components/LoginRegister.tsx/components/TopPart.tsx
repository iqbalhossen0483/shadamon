import Image from "next/image";
import React from "react";
import useStore from "../../../context/hooks/useStore";

const TopPart = ({ title }: { title?: string }) => {
  const store = useStore();
  return (
    <div>
      <Image width={100} height={100} src='/login-icon.png' alt='icon' />
      <p className='font-semibold leading-3'>{title || "Login"}</p>
      <p>
        {store?.State.showLoginPage
          ? `${title} and enjoy many facilities`
          : "Please Sign up to post you ad"}
      </p>
    </div>
  );
};

export default TopPart;
