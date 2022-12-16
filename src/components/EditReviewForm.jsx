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
import Autocomplete from "@mui/material/Autocomplete";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/firebase";
import { getAllByGroup } from "../slices/compositionSlice";

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
  const { reviewsAll } = useSelector((state) => state.review);
  const { tags } = useSelector((state) => state.tag);
  const { currentReview, loading, error } = useSelector(
    (state) => state.review
  );
  let uploadTask;

  const schema = yup
    .object({
      group: yup.string().required(),
      title: yup.string().required(),
      composition: yup.string().required(),
      markdown: yup.string().required(),
      img: yup.string(),
      tags: yup.array(),
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
      group: "",
      composition: "",
      title: currentReview.title,
      markdown: currentReview.markdown,
      tags: [],
      reviewRating: currentReview.reviewRating,
    },
  });

  const onSubmit = async (data) => {
    let fullData;
    if (img.length) {
      fullData = {
        ...data,
        user: currentUser._id,
        img,
      };
    } else {
      fullData = {
        ...data,
        tags,
        user: currentUser._id,
      };
    }
    console.log(fullData);
    //dispatch(addReview(fullData));
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
        <Typography variant="paragraph" color="text.primary">
          {errors.group?.message}
        </Typography>

        <InputLabel>Composition</InputLabel>
        <Controller
          name="composition"
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allCompositions}
              getOptionLabel={(option) => option.title}
              onChange={(event, item) => {
                field.onChange(item._id);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Composition" />
              )}
            />
          )}
          control={control}
        />
        <Typography variant="paragraph" color="text.primary">
          {errors.composition?.message}
        </Typography>

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
        <Typography color="text.primary">{errors.markdown?.message}</Typography>
        <InputLabel>Tags</InputLabel>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              multiple
              limitTags={5}
              id="multiple-limit-tags"
              options={tags}
              getOptionLabel={(option) => option}
              onChange={(event, item) => {
                field.onChange(item);
              }}
              renderInput={(params) => <TextField {...params} label="tags" />}
            />
          )}
          rules={{ required: true }}
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
