import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Box from "@mui/material/Box";

const fileTypes = ["JPG", "PNG"];

function DragDrop({ setFile }) {
  const imageHandleChange = (file) => {
    setFile((prevState) => file);
  };
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <FileUploader
        name="file"
        types={fileTypes}
        handleChange={imageHandleChange}
      />
    </Box>
  );
}

export default DragDrop;
