import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import CloseButton from "../../utilitize/CloseButton";

type Props = {
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const Profile = ({ showProfile, setShowProfile }: Props) => {
  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
    display: "block",
  };

  return (
    <div>
      <Modal open={showProfile} onClose={() => setShowProfile(false)}>
        <Box sx={style} className='modal'>
          <header>
            <p>Profile</p>
            <CloseButton onClick={setShowProfile} />
          </header>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
