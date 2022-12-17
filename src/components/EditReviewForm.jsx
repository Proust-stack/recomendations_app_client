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
import { addReview, updateReview } from "../slices/reviewSlice";
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
import app from "../utils/firebase";
import { getAllByGroup, getOneComposition } from "../slices/compositionSlice";
import { getAllTags } from "../slices/tagSlice";

export default function EditReviewForm({ compositionId }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [img, setImg] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [imgPerc, setImgPerc] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const { groups } = useSelector((state) => state.group);
  const { compositionsByGroup } = useSelector((state) => state.composition);
  const { allCompositions } = useSelector((state) => state.composition);
  const { currentComposition } = useSelector((state) => state.composition);
  const { tags } = useSelector((state) => state.tag);
  const { currentReview, loading, error } = useSelector(
    (state) => state.review
  );
  const [tagsValue, setTagsValue] = useState(currentReview.tags || []);
  let uploadTask;

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
        composition: currentReview.composition._id,
      };
    } else {
      fullData = {
        ...data,
        tags: tagsValue,
        user: currentReview.user,
        composition: currentReview.composition._id,
      };
    }
    console.log(fullData);
    const objectForDispatch = {
      data: fullData,
      id: currentReview._id,
    };
    dispatch(updateReview(objectForDispatch));
  };

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

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    dispatch(getAllByGroup(event.target.value));
  };

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
      <div>{errors.tags?.message}</div>
      <InputLabel>Images</InputLabel>
      <DragDrop setFile={setFile} />
      <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Submit changes
      </Button>
    </form>
  );
}
