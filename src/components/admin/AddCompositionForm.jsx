import React from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import DragDrop from "../ui/DragDrop";
import { useState } from "react";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";

import { addComposition } from "../../slices/compositionSlice";
import { uploadFile } from "../../utils/uploadFile";
import AlertComponent from "../ui/AlertComponent";

export default function AddCompositionForm() {
  const [files, setFile] = useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);

  const schema = yup
    .object({
      title: yup.string().required(),
      group: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      group: "",
    },
  });

  const onSubmit = async (data) => {
    let images = [];
    if (files.length) {
      images = await uploadFile(files);
    }
    let fullData = {
      ...data,
      img: images,
    };
    console.log(fullData);
    dispatch(addComposition(fullData));
    setOpenAlert(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "85%",
        padding: 20,
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
        <Typography variant="paragraph" color="text.primary">
          {errors.title?.message}
        </Typography>
        <InputLabel>Group</InputLabel>
        <Controller
          name="group"
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...field}>
              {groups?.map((group) => (
                <MenuItem value={`${group._id}`} key={group.title}>
                  {group.title}
                </MenuItem>
              ))}
            </Select>
          )}
          control={control}
        />
        <Typography variant="paragraph" color="text.primary">
          {errors.group?.message}
        </Typography>
      </Box>
      <InputLabel>Images</InputLabel>
      <DragDrop setFile={setFile} />
      <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Create composition
      </Button>
      <AlertComponent
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        text="Composition created!"
      />
    </form>
  );
}
