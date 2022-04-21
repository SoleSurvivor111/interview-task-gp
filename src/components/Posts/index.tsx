import React from "react";
import { Grid, Typography, Divider, Paper, Box } from "@mui/material";
import { BaseCard } from "components/Card";
import { useGetPostsByUserIdQuery } from "services/api";
import { useParams } from "react-router-dom";

export const Posts = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPostsByUserIdQuery(id);

  return (
    <Box sx={{ padding: "14px" }}>
      <Typography variant="h5" sx={{ mb: "15px" }}>
        {data?.length ? "Posts" : "No posts"}
      </Typography>
      <Paper
        sx={{ padding: "20px 20px", overflowY: "auto", maxHeight: "400px" }}
      >
        {data?.map(({ title, body }, idx) => (
          <>
            <BaseCard isLoading={isLoading} error={error} maxWidth="700px">
              <Grid container wrap="wrap" spacing={2}>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <Typography
                    variant="h6"
                    sx={{ margin: 0, textAlign: "left" }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "left" }}>
                    {body}
                  </Typography>
                </Grid>
              </Grid>
            </BaseCard>
            {idx !== data?.length - 1 && (
              <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
            )}
          </>
        ))}
      </Paper>
    </Box>
  );
};
