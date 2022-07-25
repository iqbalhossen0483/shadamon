import Image from "next/image";
import React from "react";

const TopPart = ({ title }: { title?: string }) => {
  return (
    <div>
      {title === "Login" ? (
        <Image width={100} height={100} src='/singup-icon.png' alt='icon' />
      ) : (
        <Image width={100} height={100} src='/login-icon.png' alt='icon' />
      )}
      <p className='font-semibold leading-3'>{title || "Sign Up"}</p>
      <p>
        {title
          ? `${title} and enjoy many facilities`
          : "Please Sign up to post your ad"}
      </p>
    </div>
  );
};

export default TopPart;
