import BorderColorIcon from "@mui/icons-material/BorderColor";
import { fetchApi } from "../../../client/services/fetchApi";
import useStore from "../../../context/hooks/useStore";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Spinner from "../../utilitize/Spinner";
import LocationModal from "./LocationModal";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Location = () => {
  const [addLocation, setAddLocation] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
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
      if (!error) {
        setLocations(data);
        setLoading(false);
      } else store?.State.setAlert({ msg: error.message, type: "error" });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  async function deleteLocation(id: string) {
    setLoading(true);
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
    setLoading(false);
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
      setUpdate((prev) => !prev);
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
      setUpdate((prev) => !prev);
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
          {!loading ? (
            locations?.length ? (
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
                      <button
                        disabled={loading}
                        onClick={() => deleteLocation(loc._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td>
                  <b>No Data</b>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td>
                <Spinner />
              </td>
            </tr>
          )}
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
