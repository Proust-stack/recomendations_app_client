import React from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { sendComment } from "../slices/commentSlice";

export default function Comment({ reviewId }) {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const onSubmit = async (data, e) => {
    e.target.reset();
    const fulldata = { ...data, review: reviewId };
    dispatch(sendComment(fulldata));
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
          alignItems: "flex-end",
        }}
      >
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField {...field} sx={{ width: "100%" }} multiline />
          )}
          rules={{ required: true }}
        />
        <Button type="submit" variant="text">
          Send
        </Button>
      </Box>
    </form>
  );
}
