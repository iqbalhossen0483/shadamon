import { Box, Button, Modal } from "@mui/material";
import React from "react";
import useStore from "../../context/hooks/useStore";
import CloseIcon from "@mui/icons-material/Close";

const MyAccount = () => {
  const store = useStore();
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

  return (
    <div>
      <Modal
        open={store?.State.showMyAccountPage || false}
        onClose={() => store?.State.setShowMyAccountPage(false)}
      >
        <Box sx={style} className='my-account-container'>
          <div
            onClick={() => store?.State.setShowMyAccountPage(false)}
            className='close-icon'
          >
            <CloseIcon />
          </div>
          <p>my account</p>
          <Button onClick={singOut}>LogOut</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyAccount;
