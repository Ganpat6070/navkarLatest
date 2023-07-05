const mongoose = require("mongoose");
const express = require("express");

mongoose
  .connect("mongodb://127.0.0.1:27017/navkar")
  .then(() => {
    console.log("Connection Succesfull");
  })
  .catch((e) => {
    console.log("Not Connected" + e);
  });
