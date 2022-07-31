import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { modal_style } from "../shared";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";
import { useRef } from "react";
import useStore from "../../../context/hooks/useStore";
import { fetchApi } from "../../../client/services/fetchApi";
import { useRouter } from "next/router";

const LocationModal = ({ showModal, setShowModal, title, submitter }) => {
  const [subLocation, setSubLocation] = useState({ location_1: "" }),
    [loading, setLoading] = useState(false),
    submitBtn = useRef(null),
    store = useStore(),
    router = useRouter(),
    [locationData, setLocationData] = useState({
      location_name: "",
      map_link: "",
      ordering: "",
      status: "Yes",
    });

  function handleRemove(key, i) {
    if (i > 0) {
      const sub = subLocation;
      delete sub[key];
      setSubLocation({ ...sub });
    }
  }
  function handleAdd(index) {
    const sub = subLocation;
    sub[`category_${index + 2}`] = "";
    setSubLocation({ ...sub });
  }
  function handleInput(value, name) {
    const exist = locationData;
    exist[name] = value;
    setLocationData({ ...exist });
  }

  useEffect(() => {
    if (title === "Update Location" && router.query.id && showModal) {
      (async () => {
        const { data, error } = await fetchApi(
          `/api/location?id=${router.query.id}`
        );
        if (!error) {
          setLocationData({
            location_name: data.location_name,
            map_link: data.map_link,
            ordering: data.ordering,
            status: data.status,
          });
          const sub = {};
          data.sub_location.forEach((s, i) => {
            sub[`location_${i + 1}`] = s;
          });
          setSubLocation(sub);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, showModal]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {};
    payload.location_name = locationData.location_name;
    payload.map_link = locationData.map_link;
    payload.ordering = locationData.ordering;
    payload.status = locationData.status;
    const sub = [];
    Object.entries(subLocation).forEach(([_, value]) => {
      if (value) sub.push(value);
    });
    payload.sub_location = sub;
    payload.created_by = {
      uid: store.auth.user.uid,
      name: store.auth.user.displayName,
    };
    const date = new Date().toISOString();
    payload.created_at = new Date(date);

    const { error } = await submitter(payload);

    if (!error) {
      setShowModal(false);
      setSubLocation({ location_1: "" });
      setLocationData({
        location_name: "",
        map_link: "",
        ordering: "",
        status: "Yes",
      });
    }
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

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='col-span-3 grid grid-cols-3'>
            <div className='col-span-2 space-y-2'>
              <input
                type='text'
                value={locationData.location_name}
                required
                onChange={(e) => handleInput(e.target.value, "location_name")}
                placeholder='Location Name'
              />
              <div className='relative space-y-2'>
                {Object.entries(subLocation).map(([key, value], index, arr) => (
                  <React.Fragment key={key}>
                    <input
                      type='text'
                      value={value}
                      required
                      onChange={(e) =>
                        setSubLocation((prev) => {
                          const newP = prev;
                          newP[key] = e.target.value;
                          return { ...newP };
                        })
                      }
                      placeholder='Sub Location'
                    />
                    {index === arr.length - 1 && (
                      <section className='add-remove'>
                        <button
                          onClick={() => handleAdd(index)}
                          className='border'
                          type='button'
                        >
                          <AddIcon />
                        </button>
                        <button
                          onClick={() => handleRemove(key, index)}
                          className='border'
                          type='button'
                        >
                          <Remove />
                        </button>
                      </section>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className='col-span-2 space-y-2'>
            <input
              value={locationData.map_link}
              onChange={(e) => handleInput(e.target.value, "map_link")}
              type='url'
              placeholder='Location Map Link'
            />
            <input
              value={locationData.ordering}
              onChange={(e) => handleInput(e.target.value, "ordering")}
              type='text'
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

export default LocationModal;
