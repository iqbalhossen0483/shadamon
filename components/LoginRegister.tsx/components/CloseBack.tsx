import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useStore from "../../../context/hooks/useStore";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const CloseBack = () => {
  const store = useStore();
  return (
    <div className='close-icon'>
      {store?.State.showLoginPage && (
        <KeyboardBackspaceIcon
          onClick={() => store?.State.setShowLoginPage(false)}
          className='back'
        />
      )}
      <CloseIcon
        onClick={() => store?.State.setShowLoginRegister(false)}
        className='close'
      />
    </div>
  );
};

export default CloseBack;
