import React from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import DragDrop from "../ui/DragDrop";
import { useState } from "react";
import { addComposition, addGroup } from "../../http/adminAPI";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function AddCompositionForm() {
  const [file, setFile] = useState([]);
  const { groups } = useSelector((state) => state.group);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      img: "",
      tags: "",
      group: "",
    },
  });
  const onSubmit = async (data) => {
    const composition = await addComposition(data);
    console.log(composition);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        padding: 10,
        width: "80%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 2,
          gap: 1,
        }}
      >
        <InputLabel>Title</InputLabel>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField {...field} />}
          rules={{ required: true }}
        />
        <InputLabel>Group</InputLabel>
        <Controller
          name="group"
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...field}>
              {groups.map((group) => (
                <MenuItem value={`${group._id}`} key={group.title}>
                  {group.title}
                </MenuItem>
              ))}
            </Select>
          )}
          control={control}
        />
        <InputLabel>Tags</InputLabel>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => <TextField {...field} />}
          rules={{ required: true }}
        />
      </Box>
      <InputLabel>Images</InputLabel>
      <DragDrop setFile={setFile} />
      <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Create composition
      </Button>
    </form>
  );
}
