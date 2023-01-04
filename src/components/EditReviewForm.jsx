import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";

import { getAllTags } from "../slices/tagSlice";
import { uploadFile } from "../utils/uploadFile";
import SendButton from "./ui/SendButton";
import { updateReview } from "../slices/reviewSlice";
import DragDrop from "./ui/DragDrop";

export default function EditReviewForm({
  compositionId,
  handleClose,
  setOpenAlert,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { currentComposition } = useSelector((state) => state.composition);
  const { tags } = useSelector((state) => state.tag);
  const { currentReview } = useSelector((state) => state.review);
  const [tagsValue, setTagsValue] = useState(currentReview.tags || []);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const schema = yup
    .object({
      title: yup.string().required(),
      markdown: yup.string().required(),
      img: yup.string(),
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
      tags: tagsValue,
      user: currentReview.user,
      composition: currentComposition._id,
    };

    const objectForDispatch = {
      data: fullData,
      id: currentReview._id,
    };
    dispatch(updateReview(objectForDispatch));
    setOpenAlert(true);
    handleClose();
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
      <Button
        variant="text"
        sx={{ position: "absolut", top: 0, right: 1 }}
        onClick={handleClose}
      >
        X
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <InputLabel>{t("new_review_group")}</InputLabel>
        <TextField disabled defaultValue={currentComposition.group.title} />
        <InputLabel>{t("new_review_composition")}</InputLabel>
        <TextField disabled defaultValue={currentReview.composition.title} />
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
      <InputLabel>{t("new_review_images")}</InputLabel>
      <DragDrop setFile={setFiles} />
      {/* <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Submit changes
      </Button> */}
      <SendButton btnText="new_review_btn" />
    </form>
  );
}
