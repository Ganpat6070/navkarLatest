import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Menu, MenuItem, Select } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemAsync,
  fetchItemsAsync,
  findIndItemAsync,
  selectedFetchedTask,
  selectedIndividualTask,
} from "../auth/authSlice";
import UserModalComponent from "./UserModalComponent";
import UpdateModal from "./UpdateModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TableComp() {
  // const [action, setAction] = React.useState();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const items = useSelector(selectedFetchedTask);
  // console.log("items", items);
  const particularItems = useSelector(selectedIndividualTask);
  // console.log('pardicularItems', particularItems);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState("");

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleMenuItemClick = (value) => {
    setSelectedItem(value);
    handleClose();
  };

  const handleDelete = (id) => {
    console.log("iconid", id);
    dispatch(deleteItemAsync({_id: id}));
  };

  const handleEdit = (taskId) => {
    console.log(taskId)
    dispatch(findIndItemAsync({_id: taskId}));
    setIsModalOpen(true);
  };
  

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 720 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>FullName</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items[0]?.tasks?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.gender}</StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>

                  <StyledTableCell align="left">
                  <EditIcon onClick={()=>handleEdit(row._id)} />&nbsp;&nbsp;&nbsp;&nbsp;
                  <DeleteIcon onClick={()=>handleDelete(row._id)} />
                    
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          {isModalOpen && <UpdateModal onClose={() => setIsModalOpen(false)} particularItems={particularItems} />}

        </Table>
      </TableContainer>
    </>
  );
}
