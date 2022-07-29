import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import useStore from "../../context/hooks/useStore";
import Dashboard from "./component/Dashboard";
import Profile from "./component/Profile";
import Setting from "./component/Setting";
import CloseButton from "../utilitize/CloseButton";

const MyAccount = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const store = useStore();
  const buttons = ["Dashboard", "Profile", "Setting"];
  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
    display: "block",
  };

  function handlePagination(page: string) {
    if (page === "Profile") {
      setShowProfile(true);
    } else if (page === "Setting") {
      setShowSetting(true);
    }
  }

  return (
    <div>
      <Modal
        open={store?.State.showMyAccountPage || false}
        onClose={() => store?.State.setShowMyAccountPage(false)}
      >
        <Box sx={style} className='my-account-container modal bg-gray-200'>
          <header className='bg-white'>
            <div>
              {buttons.map((button) => (
                <Button
                  key={button}
                  onClick={() => handlePagination(button)}
                  variant='outlined'
                >
                  {button}
                </Button>
              ))}
            </div>
            <CloseButton
              onClick={() => store?.State.setShowMyAccountPage(false)}
              classes='top-1'
            />
          </header>
          <Dashboard />
          <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
          <Setting showSetting={showSetting} setShowSetting={setShowSetting} />
        </Box>
      </Modal>
    </div>
  );
};

export default MyAccount;
