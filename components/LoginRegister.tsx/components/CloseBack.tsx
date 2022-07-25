import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useStore from "../../../context/hooks/useStore";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const CloseBack = () => {
  const store = useStore();
  return (
    <div className='close-icon'>
      {store?.State.showLoginPage && (
        <div
          className='back'
          onClick={() => {
            store.State.setShowLoginPage(false);
          }}
        >
          <KeyboardBackspaceIcon />
        </div>
      )}
      <div
        onClick={() => {
          store?.State.setShowLoginRegister(false);
        }}
        className='close'
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default CloseBack;
