import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useStore from "../../../context/hooks/useStore";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const CloseBack = () => {
  const store = useStore();
  return (
    <div className='close-icon'>
      {(store?.State.showLoginPage || store?.State.showMessage.otp) && (
        <KeyboardBackspaceIcon
          onClick={() => {
            if (store.State.showMessage.otp) {
              store.State.setShowMessage({ otp: false, email: false });
            } else if (store.State.showLoginPage) {
              store.State.setShowLoginPage(false);
            }
          }}
          className='back'
        />
      )}
      <CloseIcon
        onClick={() => {
          store?.State.setShowLoginRegister(false);
          if (store?.auth.user?.emailVerified) {
            store?.State.setShowMessage({ otp: false, email: false });
          }
        }}
        className='close'
      />
    </div>
  );
};

export default CloseBack;
