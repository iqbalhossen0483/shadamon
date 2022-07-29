import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { fetchApi } from "../../../client/services/fetchApi";
import useStore from "../../../context/hooks/useStore";
import CloseButton from "../../utilitize/CloseButton";

type Props = {
  showUserPhotoUpload: boolean;
  setShowUserPhotoUpload: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserPhotoUpload = ({
  showUserPhotoUpload,
  setShowUserPhotoUpload,
}: Props) => {
  const [image, setImage] = useState<FileList | null>(null);
  const [showTakePicture, setShowTakePicture] = useState(false);
  const store = useStore();
  const video = useRef<HTMLVideoElement>(null);
  const canva = useRef<HTMLCanvasElement>(null);

  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
  };

  async function changeProfile() {
    if (image) {
      const formData = new FormData();
      formData.append("profile", image[0]);
      const { data, error } = await fetchApi("/api/users", {
        method: "PUT",
        body: formData,
      });
      if (error) {
        store?.State.setAlert({ msg: error.message, type: "error" });
      } else {
        console.log(data);
      }
    }
  }

  async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    window.stream = stream;

    if (video.current) {
      video.current.srcObject = window.stream;
    }
  }

  async function captureImage() {
    const form = new FormData();
    if (canva.current && video.current) {
      canva.current
        .getContext("2d")
        ?.drawImage(
          video.current,
          0,
          0,
          canva.current.width,
          canva.current.height
        );
      const data_url = canva.current.toDataURL("image/jpeg");

      form.append("image", data_url);
      const { data, error } = await fetchApi("/api/users?camera", {
        method: "PUT",
        body: form,
      });
      console.log({ data, error });
    }
  }

  return (
    <Modal
      open={showUserPhotoUpload}
      onClose={() => setShowUserPhotoUpload(false)}
    >
      <Box sx={style} className='modal user-photo-container'>
        <CloseButton
          onClick={() => {
            setShowUserPhotoUpload(false);
            if (window.stream) {
              window.stream.getVideoTracks()[0].stop();
            }
          }}
        />
        <div className='flex justify-center gap-5'>
          <div className='text-center'>
            <IconButton
              onClick={() => setShowTakePicture(true)}
              className='bg-gray-200'
            >
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
              <input
                onChange={(e) => setImage(e.target.files)}
                hidden
                accept='image/*'
                type='file'
              />
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
        <Button
          onClick={changeProfile}
          disabled={!image}
          className='submit-btn'
          variant='contained'
        >
          Submit
        </Button>

        <Modal open={showTakePicture} onClose={() => setShowTakePicture(false)}>
          <Box id='cameraView' sx={style} className='modal'>
            <CloseButton onClick={() => setShowTakePicture(false)} />
            <button onClick={startCamera}>Start Camera</button>
            <video ref={video} width='320' height='240' autoPlay></video>
            <Button onClick={captureImage}>Click Photo</Button>
            <canvas ref={canva} width='320' height='240'></canvas>
          </Box>
        </Modal>
      </Box>
    </Modal>
  );
};

export default UserPhotoUpload;
