import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import DragDrop from "./ui/DragDrop";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllTags } from "../slices/tagSlice";
import { useTranslation } from "react-i18next";
import { getAllGroups } from "../slices/groupSlice";
import { addReview } from "../slices/reviewSlice";

export default function NewReviewForm({ handleClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [img, setImg] = useState([]);
  const [tagsValue, setTagsValue] = useState([]);
  const [imgPerc, setImgPerc] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { groups } = useSelector((state) => state.group);
  const { compositionsByGroup } = useSelector((state) => state.composition);
  const { tags } = useSelector((state) => state.tag);
  let uploadTask;

  useEffect(() => {
    !groups && dispatch(getAllGroups());
  }, []);

  useEffect(() => {
    console.log("useEffect upload ");
    file.length && uploadFile(file);
  }, [file]);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const schema = yup
    .object({
      group: yup.string().required(),
      title: yup.string().required(),
      composition: yup.string().required(),
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
      group: "",
      composition: "",
      title: "",
      markdown: "",
      reviewRating: 0,
    },
  });

  const onSubmit = async (data) => {
    let fullData;
    if (img.length) {
      fullData = {
        ...data,
        user: currentUser._id,
        img,
        tags: tagsValue,
      };
    } else {
      fullData = {
        ...data,
        user: currentUser._id,
        tags: tagsValue,
      };
    }
    console.log(fullData);
    dispatch(addReview(fullData));
    setUploaded(false);
    handleClose();
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    for (const item of file) {
      const fileName = new Date().getTime() + item.name;
      const storageRef = ref(storage, "images/" + fileName);
      uploadTask = uploadBytesResumable(storageRef, item);
    }
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
          setUploaded(true);
        });
      }
    );
  };

  const handleChange = (value) => {
    dispatch(getAllByGroup(value));
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
        <InputLabel>{t("new_review_group")}</InputLabel>
        <Controller
          name="group"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(e, value) => {
                handleChange(e.target.value);
                field.onChange(e.target.value);
              }}
            >
              {groups &&
                groups.map((group) => (
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

        <InputLabel>{t("new_review_composition")}</InputLabel>
        <Controller
          name="composition"
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={compositionsByGroup || []}
              getOptionLabel={(option) => option.title}
              onChange={(event, item) => {
                field.onChange(item?._id);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          control={control}
        />
        <Typography variant="paragraph" color="text.primary">
          {errors.composition?.message}
        </Typography>

        <InputLabel>{t("new_review_rate")} </InputLabel>
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
        <InputLabel>{t("new_review_title")}</InputLabel>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField {...field} />}
          rules={{ required: true }}
        />
        <Typography variant="paragraph" color="text.primary">
          {errors.title?.message}
        </Typography>
        <InputLabel>{t("new_review_review")}</InputLabel>
        <Controller
          name="markdown"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField minRows={10} {...field} multiline />
          )}
        />
        <Typography color="text.primary">{errors.markdown?.message}</Typography>
        <InputLabel>{t("new_review_tags")}</InputLabel>
        <Autocomplete
          disablePortal
          multiple
          limitTags={5}
          id="multiple-limit-tags"
          options={tags || []}
          getOptionLabel={(option) => option}
          value={tagsValue}
          onChange={(event, newValue) => {
            setTagsValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="tags" />}
        />
      </Box>
      <InputLabel>{t("new_review_images")}</InputLabel>
      <DragDrop setFile={setFile} />
      <Typography color="text.primary">Uploaded: {imgPerc}%</Typography>
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "2rem" }}
        disabled={!uploaded}
      >
        {t("new_review_btn")}
      </Button>
    </form>
  );
}
