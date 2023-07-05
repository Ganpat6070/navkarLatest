import React, { useState } from "react";
import ButtonComp from "../components/Button";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./Table.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import UserModalComponent from "../components/UserModalComponent"; 
import TableComp from "../components/TableComp";

const TablePage = () => {
  const navigate = useNavigate();
  const top100Films = [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="titlebar">
        <div className="searchbar">&nbsp;&nbsp;</div>
        <div className="searchbar">
          <ButtonComp onClick={handleAddUser}>
            <AddIcon />
            &nbsp;Add User
          </ButtonComp>
        </div>
      </div>
      <div className="table-container">
        <TableComp />
      </div>
      {isModalOpen && <UserModalComponent onClose={handleCloseModal} />}{" "}
    </div>
  );
};

export default TablePage;
