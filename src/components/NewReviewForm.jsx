import Select from "@mui/material/Select";
import { useForm, Controller, useFormState } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import DragDrop from "./ui/DragDrop";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../slices/reviewSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/firebase";

export default function NewReviewForm({ id }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [img, setImg] = useState([]);
  const [imgPerc, setImgPerc] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  let uploadTask;

  const schema = yup
    .object({
      title: yup.string().required(),
      markdown: yup.string().required(),
      img: yup.string(),
      tags: yup.string(),
      reviewRating: yup.number().positive().integer(),
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
      markdown: "",
      img: "",
      tags: "",
      reviewRating: 0,
    },
  });

  const onSubmit = async (data) => {
    const tags = data.tags.split(",");
    const fullData = {
      ...data,
      tags,
      user: currentUser._id,
      composition: id,
      img,
    };
    console.log(fullData);
    dispatch(addReview(fullData));
  };

  console.log(file.length);
  console.log(img);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    file.forEach((item) => {
      const fileName = new Date().getTime() + item.name;
      const storageRef = ref(storage, "images/" + fileName);
      uploadTask = uploadBytesResumable(storageRef, item);
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg((prev) => [...prev, downloadURL]);
        });
      }
    );
  };

  useEffect(() => {
    file.length && uploadFile(file);
  }, [file]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <InputLabel>Rate </InputLabel>
        <Controller
          name="reviewRating"
          control={control}
          rules={{ required: true }}
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
        />
        <Typography variant="paragraph" color="text.secodary">
          {errors.reviewRating?.message}
        </Typography>
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
        <InputLabel>Review</InputLabel>
        <Controller
          name="markdown"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField minRows={10} {...field} multiline />
          )}
        />
        <p>{errors.markdown?.message}</p>
        <InputLabel>Tags</InputLabel>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => <TextField {...field} />}
          rules={{ required: true }}
        />
      </Box>
      <p>{errors.tags?.message}</p>
      <InputLabel>Images</InputLabel>
      <DragDrop setFile={setFile} />
      <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Create review
      </Button>
    </form>
  );
}
