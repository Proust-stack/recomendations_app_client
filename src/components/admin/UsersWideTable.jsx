import { alpha } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  blockUser,
  changeRole,
  deleteUser,
  getAllUsers,
  unBlockUser,
} from "../../slices/userSlice";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    disablePadding: true,
    label: "User name",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "blocked",
    disablePadding: false,
    label: "status",
  },
  {
    id: "isAdmin",
    disablePadding: false,
    label: "role",
  },
  {
    id: "_id",
    disablePadding: false,
    label: "Link to page",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
            disabled
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="none"
          >
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { numSelected, selected, setData, user } = props;

  const handleBlock = async () => {
    dispatch(blockUser(selected[0]));
    setData((prev) => !prev);
  };
  const handleUnblock = async () => {
    dispatch(unBlockUser(selected[0]));
    setData((prev) => !prev);
  };

  const handleDelete = async () => {
    dispatch(deleteUser(selected[0]));
    setData((prev) => !prev);
  };

  const handleChangeRole = async () => {
    dispatch(changeRole(selected[0]));
    setData((prev) => !prev);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {t("table_selected")}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        numSelected > 1 ? (
          <p>Please, select only one person</p>
        ) : (
          <>
            <IconButton onClick={handleChangeRole}>
              <Tooltip title="Change role">
                <AssignmentIndIcon color="success" />
              </Tooltip>
            </IconButton>

            <IconButton onClick={handleDelete}>
              <Tooltip title="Delete">
                <DeleteIcon color="error" />
              </Tooltip>
            </IconButton>

            <IconButton onClick={handleBlock} disabled={user.blocked}>
              <Tooltip title="Block" color="secondary">
                <BlockIcon />
              </Tooltip>
            </IconButton>

            <IconButton onClick={handleUnblock} disabled={!user.blocked}>
              <Tooltip title="Unblock">
                <AccessibilityIcon color="primary" />
              </Tooltip>
            </IconButton>
          </>
        )
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const UsersWideTable = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState([]);
  const [data, setData] = useState(true);
  const [order, setOrder] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    setList(allUsers);
  }, [allUsers]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = list.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list?.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setData={setData}
          user={list?.find((item) => item._id === selected[0])}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={list?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {list &&
                stableSort(list, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="left"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">
                          {row.blocked ? "blocked" : "active"}
                        </TableCell>
                        <TableCell align="left">
                          {row.isAdmin ? "admin" : "user"}
                        </TableCell>
                        <TableCell align="left">
                          <Link to={`/mypage/${row._id}`}>{row._id}</Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={list?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UsersWideTable;
