import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import DragDrop from "./ui/DragDrop";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { addReview } from "../http/reviewAPI";

export default function NewReviewForm() {
  const [file, setFile] = useState([]);
  const [formData, setFormData] = useState(null);
  const { groups } = useSelector((state) => state.group);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      markdown: "",
      img: "",
      tags: "",
      composition: "",
      reviewRating: 0,
    },
  });
  const onSubmit = async (data) => {
    const tags = data.tags.split(",");
    const fullData = { ...data, tags, user: currentUser.id };
    const review = await addReview(fullData);
    console.log(review);
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
        <InputLabel>Composition</InputLabel>
        <Controller
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
          name="composition"
          control={control}
        />
        <InputLabel>Rate </InputLabel>
        <Controller
          name="reviewRating"
          control={control}
          render={({ field }) => (
            <Rating
              name="size-small"
              defaultValue={0}
              max={10}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
            />
          )}
          rules={{ required: true }}
        />
        <InputLabel>Title</InputLabel>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField {...field} />}
          rules={{ required: true }}
        />
        <InputLabel>Review</InputLabel>
        <Controller
          name="markdown"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField minRows={10} {...field} multiline />
          )}
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
        Create review
      </Button>
    </form>
  );
}
