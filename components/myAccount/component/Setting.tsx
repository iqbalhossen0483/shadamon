import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type Props = {
  showSetting: boolean;
  setShowSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

const Setting = ({ showSetting, setShowSetting }: Props) => {
  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
    display: "block",
  };

  return (
    <div>
      <Modal open={showSetting} onClose={() => setShowSetting(false)}>
        <Box sx={style} className='my-account-container'>
          <header>
            <p>Account Setting</p>
            <div onClick={() => setShowSetting(false)}>
              <CloseIcon />
            </div>
          </header>
        </Box>
      </Modal>
    </div>
  );
};

export default Setting;
