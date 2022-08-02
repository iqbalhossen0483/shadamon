import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { fetchApi } from "../../../client/services/fetchApi";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useStore from "../../../context/hooks/useStore";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import SubLocationModal from "./SubLocationModal";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { modal_style } from "../shared";
import { useRef } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

const LocationModal = ({ showModal, setShowModal, title, submitter }) => {
  const [subLocation, setSubLocation] = useState([]),
    [showSubLocation, setShowSubLocation] = useState(false),
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

  function handleInput(value, name) {
    const exist = locationData;
    exist[name] = value;
    setLocationData({ ...exist });
  }

  //sub location functions;
  function addAndUpdateSubLocation(data, type) {
    data.ordering = parseInt(data.ordering);

    let locations;
    if (type === "Update Sub Location") {
      locations = subLocation.filter(
        (sub) => sub.sub_location_name !== router.query.name
      );
    } else locations = subLocation;

    //check is exist;
    const isExist = locations.find(
      (sub) => sub.sub_location_name === data.sub_location_name
    );
    if (isExist) {
      store.State.setAlert({
        msg: "Already exist this Location",
        type: "warning",
      });
      return { error: true };
    }
    //change ordering
    const neddOrdered = locations.find((opt) => opt.ordering === data.ordering);
    if (neddOrdered) {
      let i = data.ordering;
      for (const location of locations) {
        const exist = location.ordering === i;
        if (exist) {
          location.ordering = location.ordering + 1;
          i++;
        }
      }
    }
    const sorted = [...locations, data].sort((a, b) => a.ordering - b.ordering);
    setSubLocation(sorted);
    return { error: false };
  }
  function deleteSubLocation(name) {
    const exist = subLocation.filter((sub) => sub.sub_location_name !== name);
    setSubLocation(exist);
  }
  function handleSubUpdate(name) {
    router.push("/admin?add_location=true&name=" + name);
    setShowSubLocation(true);
  }
  //till;

  //update location function;
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
          setSubLocation(data.sub_location);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, showModal]);
  //till;

  //post location;
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const payload = { ...locationData, sub_location: subLocation };
    payload.created_by = {
      uid: store.auth.user.uid,
      name: store.auth.user.displayName,
    };
    const date = new Date().toISOString();
    payload.created_at = new Date(date);

    const { error } = await submitter(payload);

    if (!error) {
      setShowModal(false);
      setSubLocation([]);
      setLocationData({
        location_name: "",
        map_link: "",
        ordering: "",
        status: "Yes",
      });
    }
    setLoading(false);
  }

  //spinner;
  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
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
          <div className='space-y-2'>
            <input
              type='text'
              value={locationData.location_name}
              required
              onChange={(e) => handleInput(e.target.value, "location_name")}
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

        <Divider sx={{ margin: "30px 0" }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sub Location Name</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <Tooltip title='Add Sub Location'>
                  <IconButton onClick={() => setShowSubLocation(true)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subLocation.map((sub, index) => (
              <TableRow key={index}>
                <TableCell>{sub.sub_location_name}</TableCell>
                <TableCell>{sub.ordering}</TableCell>
                <TableCell>{sub.status}</TableCell>
                <TableCell>
                  <div className='space-x-2'>
                    <button
                      onClick={() => handleSubUpdate(sub.sub_location_name)}
                    >
                      <BorderColorIcon />
                    </button>
                    <button
                      onClick={() => deleteSubLocation(sub.sub_location_name)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <SubLocationModal
          setShowModal={setShowSubLocation}
          showModal={showSubLocation}
          title='Add Sub Location'
          submitter={addAndUpdateSubLocation}
        />
        <SubLocationModal
          setShowModal={setShowSubLocation}
          showModal={showSubLocation}
          title='Update Sub Location'
          submitter={addAndUpdateSubLocation}
          subLocation={subLocation}
        />
      </Box>
    </Modal>
  );
};

export default LocationModal;
