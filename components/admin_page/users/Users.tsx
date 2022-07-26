import {
  Button,
  Checkbox,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/header/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const Users = () => {
  const [highlightFirstBtn, sethighlightFirstBtn] = useState(0);
  const [highlightSecontBtn, sethighlightSecondBtn] = useState(0);
  const firstBtn = ["Both", "Seller", "Customer"];
  const secondBtn = [DeleteIcon, AddIcon, SearchIcon];
  const tableHeader = [
    "ID",
    "M Name",
    "Category",
    "Location",
    "Created Date",
    "Login Time",
    "Status",
    "Report",
    "Rating",
    "Edit By",
  ];

  return (
    <div className='user-container'>
      <Header title='Marchant Zone & User Zone' />
      <section className='menus'>
        <div className='space-x-1 flex'>
          {firstBtn.map((btn, index) => (
            <div
              className={highlightFirstBtn === index ? "focused" : "normal"}
              onClick={() => sethighlightFirstBtn(index)}
              key={index}
            >
              <Button variant='contained'>{btn}</Button>
            </div>
          ))}
        </div>
        <div className='space-x-1 flex'>
          {secondBtn.map((Btn, index) => (
            <div
              className={highlightSecontBtn === index ? "focused" : "normal"}
              onClick={() => sethighlightSecondBtn(index)}
              key={index}
            >
              <Button variant='contained'>
                <Btn />
              </Button>
            </div>
          ))}
        </div>
      </section>
      <section>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "7px 10px" }} width={5}>
                <Checkbox />
              </TableCell>
              {tableHeader.map((header) => (
                <TableCell sx={{ padding: "7px 10px" }} key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </section>
    </div>
  );
};

export default Users;
