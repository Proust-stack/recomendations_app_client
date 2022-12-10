import React from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { addGroup } from "../../http/adminAPI";

export default function AddGroupForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (data) => {
    const group = await addGroup(data);
    console.log(group);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        marginTop: 20,
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
      </Box>
      <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Create group
      </Button>
    </form>
  );
}
