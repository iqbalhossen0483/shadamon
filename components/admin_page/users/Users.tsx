import {
  Button,
  Checkbox,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import useStore from "../../../context/hooks/useStore";

const Users = () => {
  const [highlightFirstBtn, sethighlightFirstBtn] = useState(0);
  const [highlightSecontBtn, sethighlightSecondBtn] = useState(0);
  const [users, setUsers] = useState<UserRecord[] | null>(null);
  const firstBtn = ["Both", "Seller", "Customer"];
  const [status, setStatus] = useState("Active");
  const secondBtn = [DeleteIcon, AddIcon, SearchIcon];
  const store = useStore();
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
  const statusValues = [
    "Active",
    "Unactive",
    "Review",
    "Act & Msg",
    "UnA & Msg",
    "R-Delete",
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        } else {
          store?.State.setAlert({ msg: data.message, type: "error" });
        }
      } catch (error) {
        store?.State.setAlert({ msg: "There was an error", type: "error" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <TableCell>
                <Checkbox />
              </TableCell>
              {tableHeader.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users?.map((user) => (
                <TableRow hover key={user.uid}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{user.uid.slice(0, 7)}..</TableCell>
                  <TableCell>{user.displayName?.slice(0, 7)}..</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>
                    {user.metadata.creationTime.slice(0, 16)}
                  </TableCell>
                  <TableCell>
                    {user.metadata.lastSignInTime.slice(0, 16)}
                  </TableCell>
                  <TableCell>
                    <Select
                      className='select-status'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {statusValues.map((status: string, index) => (
                        <MenuItem value={status} key={index}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>3.8</TableCell>
                  <TableCell>Developer</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default Users;
