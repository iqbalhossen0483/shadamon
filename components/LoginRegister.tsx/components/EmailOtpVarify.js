import React, { useEffect, useState } from "react";
import OTPInput from "otp-input-react";
import CloseBack from "./CloseBack";
import useStore from "../../../context/hooks/useStore";
import { Button } from "@mui/material";

const OtpVarify = () => {
  const [otp, setOtp] = useState("");
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (otp.length < 6) return;
      const { error } = await store?.auth.varifyOtp(otp);
      if (!error) {
        store.State.setShowLoginPage(false);
        store.State.setShowLoginRegister(false);
        store.State.setShowMessage({ otp: false, email: false });
      } else {
        store.State.setAlert({ msg: error, type: "error" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <div className='email-otp-varify-container'>
      <CloseBack />
      {store.State.showMessage.otp ? (
        <OTPInput
          value={otp}
          onChange={setOtp}
          autoFocus
          inputClassName='border border-gray-500 rounded'
          OTPLength={6}
          otpType='number'
          disabled={false}
        />
      ) : (
        <div className='email-container'>
          <h3>
            An varification email sent to your email, Please check. If you don`t
            see it in your inbox, Please check your spam box.
          </h3>
          <Button
            onClick={() => {
              store.State.setShowMessage({ otp: false, email: false });
              store.State.setShowLoginRegister(true);
            }}
          >
            Try Another way
          </Button>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default OtpVarify;
