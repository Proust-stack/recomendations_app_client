import React from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { sendComment } from "../slices/commentSlice";

export default function Comment({ reviewId }) {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const onSubmit = async (data, e) => {
    reset();
    const fulldata = { ...data, review: reviewId };
    if (currentUser) {
      dispatch(sendComment(fulldata));
    } else {
      return;
    }
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
        <Button
          type="submit"
          variant="text"
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={currentUser ? null : handlePopoverOpen}
          onMouseLeave={currentUser ? null : handlePopoverClose}
        >
          {t("comment_component_button_send")}
        </Button>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            {t("comment_component_popover")}
          </Typography>
        </Popover>
      </Box>
    </form>
  );
}
