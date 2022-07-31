import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../client/services/fetchApi";
import useStore from "../../../context/hooks/useStore";
import Header from "../components/header/Header";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationModal from "./LocationModal";
import { useRouter } from "next/router";

const Location = () => {
  const [addLocation, setAddLocation] = useState(false);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [locations, setLocations] = useState<LocationData[] | null>(null);
  const store = useStore();
  const router = useRouter();

  const tableHeaders: string[] = [
    "Location Name",
    "Total Sub Location",
    "Order",
    "Status",
    "Entry Date",
    "Created By",
    "",
  ];

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi("/api/location");
      if (!error) setLocations(data);
      else store?.State.setAlert({ msg: error.message, type: "error" });
    })();
  }, [store?.State]);

  async function deleteLocation(id: string) {
    const { data, error } = await fetchApi("/api/location", {
      method: "DELETE",
      headers: {
        id,
      },
    });
    if (!error && data.deletedCount > 0) {
      store?.State.setAlert({
        msg: "Location deleted successfully",
        type: "success",
      });
      const exist = locations?.filter((lc) => lc._id !== id);
      setLocations(exist || null);
    } else if (!error && data.deletedCount === 0) {
      store?.State.setAlert({
        msg: "Ops!, unaible to delete. Try again",
        type: "error",
      });
    } else {
      store?.State.setAlert({
        msg: error.message,
        type: "error",
      });
    }
  }

  async function postLocation(payload: any) {
    const { data, error } = await fetchApi("/api/location", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!error) {
      store?.State.setAlert({ msg: data.message, type: "success" });
      return { error: false };
    } else {
      store?.State.setAlert({ msg: error.message, type: "error" });
      return { error: true };
    }
  }

  async function updateLocationData(payload: any) {
    const { data, error } = await fetchApi(
      `/api/location?id=${router.query.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!error) {
      store?.State.setAlert({ msg: data.message, type: "success" });
      return { error: false };
    } else {
      store?.State.setAlert({ msg: error.message, type: "error" });
      return { error: true };
    }
  }

  return (
    <Container className='location-container'>
      <Header title='Location' />
      <div className='first-header'>
        <Button variant='contained' onClick={() => setAddLocation(true)}>
          Add Location
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {locations &&
            locations.map((loc) => (
              <TableRow key={loc._id}>
                <TableCell>{loc.location_name}</TableCell>
                <TableCell>{loc.sub_location.length}</TableCell>
                <TableCell>{loc.ordering}</TableCell>
                <TableCell>{loc.status}</TableCell>
                <TableCell>{loc.created_at.slice(0, 10)}</TableCell>
                <TableCell>{loc.created_by.name}</TableCell>
                <TableCell>
                  <div className='space-x-2'>
                    <button
                      onClick={() => {
                        setUpdateLocation(true);
                        router.push(
                          `${router.pathname}?add_location=true&id=${loc._id}`
                        );
                      }}
                    >
                      <BorderColorIcon />
                    </button>
                    <button onClick={() => deleteLocation(loc._id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <LocationModal
        showModal={addLocation}
        setShowModal={setAddLocation}
        title='Add Location'
        submitter={postLocation}
      />
      <LocationModal
        showModal={updateLocation}
        setShowModal={setUpdateLocation}
        title='Update Location'
        submitter={updateLocationData}
      />
    </Container>
  );
};

export default Location;