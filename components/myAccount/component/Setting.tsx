import { Box, Modal } from "@mui/material";
import React from "react";
import CloseButton from "../../utilitize/CloseButton";

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
        <Box sx={style} className='modal'>
          <header>
            <p>Account Setting</p>
            <CloseButton onClick={setShowSetting} />
          </header>
        </Box>
      </Modal>
    </div>
  );
};

export default Setting;
