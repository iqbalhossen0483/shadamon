import {
  Button,
  Container,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/header/Header";
import AddLocation from "./AddLocation";

const Location = () => {
  const [addLocation, setAddLocation] = useState(false);

  const tableHeaders: string[] = [
    "Location Name",
    "Total Sub Location",
    "Order",
    "Status",
    "Entry Date",
    "Created By",
  ];

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
      </Table>

      <AddLocation addLocation={addLocation} setAddLocation={setAddLocation} />
    </Container>
  );
};

export default Location;
