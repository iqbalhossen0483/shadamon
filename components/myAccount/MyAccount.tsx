import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import useStore from "../../context/hooks/useStore";
import CloseIcon from "@mui/icons-material/Close";
import Dashboard from "./component/Dashboard";
import Profile from "./component/Profile";
import Setting from "./component/Setting";

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

  async function singOut() {
    if (store) {
      const { error } = await store.auth.singOut();
      if (error) {
        store.State.setAlert({ msg: "An error occured", type: "error" });
      } else {
        store.State.setShowMyAccountPage(false);
      }
    }
  }

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
        <Box sx={style} className='my-account-container'>
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
            <div onClick={() => store?.State.setShowMyAccountPage(false)}>
              <CloseIcon />
            </div>
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
