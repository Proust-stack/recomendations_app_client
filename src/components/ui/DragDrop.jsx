import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Box from "@mui/material/Box";

const fileTypes = ["JPG", "PNG"];

function DragDrop({ setFile }) {
  const imageHandleChange = (file) => {
    setFile((prev) => [...file]);
  };
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <FileUploader
        name="file"
        types={fileTypes}
        handleChange={imageHandleChange}
        multiple
        maxSize={5}
      />
    </Box>
  );
}

export default DragDrop;
