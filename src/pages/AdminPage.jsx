import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";
import AddGroupForm from "../components/admin/AddGroupForm";
import { Outlet, Route, Routes } from "react-router-dom";
import AddCompositionForm from "../components/admin/AddCompositionForm";
import UsersTable from "../components/admin/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../slices/userSlice";

export default function AdminPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <LeftBar />
      </Grid>
      <Grid item xs={8}>
        <Feed>
          <Outlet />
        </Feed>
      </Grid>
      <Grid item xs={2}>
        <RightBar />
      </Grid>
    </Grid>
  );
}
