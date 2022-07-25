import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CloseButton from "../../utilitize/CloseButton";

type Props = {
  showUserPhotoUpload: boolean;
  setShowUserPhotoUpload: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserPhotoUpload = ({
  showUserPhotoUpload,
  setShowUserPhotoUpload,
}: Props) => {
  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
  };

  return (
    <Modal
      open={showUserPhotoUpload}
      onClose={() => setShowUserPhotoUpload(false)}
    >
      <Box sx={style} className='modal user-photo-container'>
        <CloseButton onClick={setShowUserPhotoUpload} />
        <div className='flex justify-center gap-5'>
          <div className='text-center'>
            <IconButton className='bg-gray-200'>
              <CameraAltIcon />
            </IconButton>
            <p>Take Photo</p>
          </div>
          <div className='text-center'>
            <IconButton
              className='bg-gray-200'
              aria-label='upload picture'
              component='label'
            >
              <input hidden accept='image/*' type='file' />
              <CollectionsIcon />
            </IconButton>
            <p>From Gallery</p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
          delectus ut adipisci quaerat non, sequi provident magnam maxime, optio
          ab aliquam.
        </p>
        <Button className='submit-btn' variant='contained'>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default UserPhotoUpload;
