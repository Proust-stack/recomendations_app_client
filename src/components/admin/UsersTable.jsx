import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function UsersTable() {
  const { allUsers, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, cursor: "pointer" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>User name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                {user.blocked ? "blocked" : "active"}
              </TableCell>
              <TableCell align="right">
                {user.isAdmin ? "admin" : "user"}
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ textDecoration: "none" }}></Typography>
                <Link to={`/mypage/${user._id}`}>{user._id}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
