import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import DragDrop from "./ui/DragDrop";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../slices/reviewSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAllTags } from "../slices/tagSlice";
import app from "../utils/firebase";

export default function EditReviewForm({ compositionId, handleClose }) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const { currentComposition } = useSelector((state) => state.composition);
  const { tags } = useSelector((state) => state.tag);
  const { currentReview } = useSelector((state) => state.review);
  const [tagsValue, setTagsValue] = useState(currentReview.tags || []);

  const schema = yup
    .object({
      title: yup.string().required(),
      markdown: yup.string().required(),
      img: yup.string(),
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
      title: currentReview.title,
      markdown: currentReview.markdown,
      reviewRating: currentReview.reviewRating,
    },
  });

  const onSubmit = async (data) => {
    let fullData;
    if (img.length) {
      fullData = {
        ...data,
        img,
        tags: tagsValue,
        user: currentReview.user,
        composition: currentComposition._id,
      };
    } else {
      fullData = {
        ...data,
        tags: tagsValue,
        user: currentReview.user,
        composition: currentComposition._id,
        reviewsRatingId: "63a057292e22250c185bd057",
      };
    }
    const objectForDispatch = {
      data: fullData,
      id: currentReview._id,
    };
    dispatch(updateReview(objectForDispatch));
    // setUploaded(false);
    // handleClose();
  };

  const uploadFile = async (files) => {
    const storage = getStorage(app);
    const imgUrls = [];
    for (const file of files) {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, "images/" + fileName);
      await uploadBytesResumable(storageRef, file);
      const imgUrl = await getDownloadURL(storageRef);
      imgUrls.push(imgUrl);
    }

    setImg(imgUrls);
    setUploaded(true);
  };

  useEffect(() => {
    if (files.length) {
      uploadFile(files);
    }
  }, [files]);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

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
        <InputLabel>Group</InputLabel>
        <TextField disabled defaultValue={currentComposition.group.title} />
        <InputLabel>Composition</InputLabel>
        <TextField disabled defaultValue={currentReview.composition.title} />
        <InputLabel>Rating </InputLabel>
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
        <Typography color="text.primary">{errors.markdown?.message}</Typography>
        <InputLabel>Tags</InputLabel>
        <Autocomplete
          defaultValue={currentReview.tags}
          disablePortal
          multiple
          limitTags={5}
          id="multiple-limit-tags"
          options={tags}
          getOptionLabel={(option) => option}
          value={tagsValue}
          onChange={(event, newValue) => {
            setTagsValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <InputLabel>Images</InputLabel>
      <DragDrop setFile={setFiles} />
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "2rem" }}
        disabled={files.length && !uploaded}
      >
        Submit changes
      </Button>
    </form>
  );
}
