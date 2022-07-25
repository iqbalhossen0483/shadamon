import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useStore from "../../../context/hooks/useStore";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type Props = {
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseBack = ({ showLogin, setShowLogin }: Props) => {
  const store = useStore();
  return (
    <div className='back-close-icon'>
      {showLogin && (
        <div
          className='back'
          onClick={() => {
            setShowLogin(false);
          }}
        >
          <KeyboardBackspaceIcon />
        </div>
      )}
      <div
        onClick={() => {
          store?.State.setShowLoginRegister(false);
          setShowLogin(false);
        }}
        className='close'
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default CloseBack;
