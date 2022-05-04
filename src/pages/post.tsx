import React from "react";
import { Box, Typography } from "@mui/material";
import { BaseCard } from "components/Card";
import { useGetPostByIdQuery } from "services/api";
import { useParams } from "react-router-dom";
import { Comments } from "components/Comments";
import { BackBtn } from "components/BackButton";

export const PostPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPostByIdQuery(id);

  return (
    <Box>
      <BackBtn sx={{ position: "absolute", top: 50, left: 50 }} />
      <BaseCard isLoading={isLoading} error={error} maxWidth="700px">
        <Box>
          <Typography variant="h4" sx={{ mb: "10px" }}>
            {data?.title}
          </Typography>
          <Typography variant="body1">{data?.body}</Typography>
          <Comments />
        </Box>
      </BaseCard>
    </Box>
  );
};
