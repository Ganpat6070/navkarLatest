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
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { addDataAsync } from "../auth/authSlice";
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

const UserModalComponent = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

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
              console.log(data);
              dispatch(
                addDataAsync({
                  fullName: data.regfullname,
                  email: data.regemail,
                  gender: data.reggender,
                  status: data.regstatus,
                })
              );
              reset();
            })}
          >
            <TextField
              label="Full Name"
              {...register("regfullname", { required: "FullName required" })}
              fullWidth
              margin="normal"
              id="regfullname"
            />
            {errors.regfullname && errors.regfullname.message && (
              <p style={{ color: "red" }}>{errors.regfullname.message}</p>
            )}
            <TextField
              label="Email"
              id="regemail"
              {...register("regemail", { required: "Email required" })}
              fullWidth
              margin="normal"
            />
            {errors.regemail && errors.regemail.message && (
              <p style={{ color: "red" }}>{errors.regemail.message}</p>
            )}
            {/* <FormControl isInvalid={!!errors.reggender}> */}
            {/* <FormLabel id="reggender">Gender</FormLabel> */}
            <select {...register("reggender", { required: "Email required" })}>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {/* {errors.reggender && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.reggender.message}
                </FormHelperText>
              )} */}
            {/* </FormControl> */}

            <TextField
              label="Status"
              id="regstatus"
              {...register("regstatus", { required: "Enter status" })}
              fullWidth
              margin="normal"
            />
            {errors.regstatus && errors.regstatus.message && (
              <p style={{ color: "red" }}>{errors.regstatus.message}</p>
            )}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModalComponent;
