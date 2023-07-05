import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { addDataAsync, updateItemAsync } from "../auth/authSlice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateModal = ({ onClose, particularItems }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue, 
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  console.log("particularItems", particularItems);

  return (
    <div>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <form
            onSubmit={handleSubmit((data) => {
              console.log("modaldata", data);
              dispatch(
                updateItemAsync({
                  _id: particularItems._id,
                  fullName: data.modalfullname,
                  email: data.modalemail,
                  gender: data.modalgender,
                  status: data.modalstatus,
                })
              );
              reset();
            })}
          >
            <TextField
              label="Full Name"
              {...register("modalfullname", { required: "FullName required" })}
              defaultValue={particularItems ? particularItems.fullName : ""}
              fullWidth
              margin="normal"
              id="modalfullname"
            />
            {errors.modalfullname && errors.modalfullname.message && (
              <p style={{ color: "red" }}>{errors.modalfullname.message}</p>
            )}
            <TextField
              label="Email"
              id="modalemail"
              {...register("modalemail", { required: "Email required" })}
              defaultValue={particularItems ? particularItems.email : ""}
              fullWidth
              margin="normal"
            />
            {errors.modalemail && errors.modalemail.message && (
              <p style={{ color: "red" }}>{errors.modalemail.message}</p>
            )}
            <FormLabel id="modalgender">Gender</FormLabel>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <select
              id="modalgender"
              {...register("modalgender", { required: "Select Gender" })}
              defaultValue={particularItems ? particularItems.gender : ""}
              onChange={(e) => {
                setValue("modalgender", e.target.value); // Manually update the form value
              }}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.modalgender && (
              <FormHelperText style={{ color: "red" }}>
                {errors.modalgender.message}
              </FormHelperText>
            )}
            <TextField
              label="Status"
              id="modalstatus"
              {...register("modalstatus", { required: "Enter status" })}
              defaultValue={particularItems ? particularItems.status : ""}
              fullWidth
              margin="normal"
            />
            {errors.modalstatus && errors.modalstatus.message && (
              <p style={{ color: "red" }}>{errors.modalstatus.message}</p>
            )}
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
