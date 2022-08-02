import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { modal_style } from "../shared";
import { useRouter } from "next/router";

const SubLocationModal = (props) => {
  const { showModal, setShowModal, title, submitter, subLocation } = props;
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState({
    sub_location_name: "",
    map_link: "",
    ordering: "",
    status: "Yes",
  });
  const submitBtn = useRef(null);
  const router = useRouter();

  function handleInput(value, name) {
    const exist = locationData;
    exist[name] = value;
    setLocationData({ ...exist });
  }

  useEffect(() => {
    const isUpdate = router.query.name && title === "Update Sub Location";
    if (isUpdate) {
      const data = subLocation.find(
        (sub) => sub.sub_location_name === router.query.name
      );
      if (data) {
        setLocationData({
          sub_location_name: data.sub_location_name,
          map_link: data.map_link,
          ordering: data.ordering,
          status: data.status,
        });
      }
    }
  }, [title, showModal, subLocation, router.query.name]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = submitter(locationData, title);
    if (!error) {
      setLocationData({
        sub_location_name: "",
        map_link: "",
        ordering: "",
        status: "Yes",
      });
      setShowModal(false);
    }
    setLoading(false);
  }

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box style={modal_style} className='modal add-location'>
        <header>
          <div>
            <AddBoxRoundedIcon /> <span>{title}</span>
          </div>
          <div>
            <Button
              onClick={() => submitBtn.current?.click()}
              disabled={loading}
              variant='contained'
              className='save'
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
              variant='contained'
              className='cancel'
            >
              Cancel
            </Button>
          </div>
        </header>
        <form className='mt-6' onSubmit={(e) => handleSubmit(e)}>
          <div className='space-y-2'>
            <input
              type='text'
              value={locationData.sub_location_name}
              onChange={(e) => handleInput(e.target.value, "sub_location_name")}
              required
              placeholder='Location Name'
            />
            <input
              value={locationData.map_link}
              onChange={(e) => handleInput(e.target.value, "map_link")}
              type='url'
              placeholder='Location Map Link'
            />
          </div>
          <div className='space-y-2'>
            <input
              value={locationData.ordering}
              onChange={(e) => handleInput(e.target.value, "ordering")}
              type='number'
              required
              placeholder='Ordering'
            />
            <div className='flex justify-between items-center'>
              <p>Status</p>
              <div className='flex gap-1 items-center justify-end'>
                <input
                  onChange={(e) => handleInput(e.target.value, "status")}
                  checked={locationData.status === "Yes"}
                  id='yes'
                  value='Yes'
                  type='radio'
                  name='status'
                />
                <label htmlFor='yes'>Yes</label>
                <input
                  onChange={(e) => handleInput(e.target.value, "status")}
                  checked={locationData.status === "No"}
                  value='No'
                  id='no'
                  type='radio'
                  name='status'
                />
                <label htmlFor='no'>No</label>
              </div>
            </div>
          </div>
          <button hidden ref={submitBtn} type='submit'>
            submit
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default SubLocationModal;
