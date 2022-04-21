import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Form, Field } from "react-final-form";
import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";

import { TextField } from "@mui/material";
import { useAddPostMutation } from "services/api";

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const required = (value: string) => (value ? undefined : "Required");

export function AddPostModal() {
  const [addPost, { isLoading }] = useAddPostMutation();
  const [isOpen, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const post = await addPost(values).unwrap();
      enqueueSnackbar(`Post with ${post.id} was created.`, {
        variant: "success",
      });
      setOpen(false);
    } catch ({ error, originalStatus }: any) {
      enqueueSnackbar(`${error} ${originalStatus}.`, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          width: "auto",
          height: "50px",
          mt: "20px",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        Add post
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              id="modal-modal-description"
              sx={{ mb: "20px" }}
            >
              Add post
            </Typography>
            <Form
              onSubmit={handleSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                valid,
                dirty,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Field name="user_id" validate={required}>
                      {({ input, meta }) => (
                        <TextField
                          sx={{ mb: "15px" }}
                          type="text"
                          error={meta.error && meta.touched}
                          id={input.name}
                          label="UserId"
                          helperText={<span>{meta.error}</span>}
                          {...input}
                        />
                      )}
                    </Field>
                    <Field name="title" validate={required}>
                      {({ input, meta }) => (
                        <TextField
                          sx={{ mb: "15px" }}
                          type="text"
                          error={meta.error && meta.touched}
                          id={input.name}
                          label="Title"
                          helperText={<span>{meta.error}</span>}
                          {...input}
                        />
                      )}
                    </Field>
                    <Field name="body" validate={required}>
                      {({ input, meta }) => (
                        <TextareaAutosize
                          id={input.name}
                          minRows={10}
                          {...input}
                          style={{ width: "200px" }}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <LoadingButton
                      type="submit"
                      disabled={submitting || pristine || !valid}
                      variant="contained"
                      sx={{ width: 100, mt: "20px", mr: "5px" }}
                      endIcon={<SendIcon />}
                      loading={isLoading}
                      loadingPosition="end"
                    >
                      Publish
                    </LoadingButton>
                  </Box>
                </form>
              )}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
