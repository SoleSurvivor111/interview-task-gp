import React from "react";
import { Box, Typography } from "@mui/material";
import { BaseCard } from "components/Card";
import Avatar from "@mui/material/Avatar";
import { useGetUserByIdQuery } from "services/api";
import { useParams } from "react-router-dom";
import { generateRandomColor, getInitials } from "tools";
import { Posts } from "components/Posts";
import { BackBtn } from "components/BackButton";

export const UserPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserByIdQuery(id);
  const initials = getInitials(data?.name);

  if (error) return <span>Error</span>;

  return (
    <Box>
      <BackBtn sx={{ position: "absolute", top: 50, left: 50 }} />
      <BaseCard isLoading={isLoading} maxWidth="700px">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: generateRandomColor(),
                mr: "30px",
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography variant="h6">{`${data?.name} <${data?.email}>`}</Typography>
              <Typography variant="body1">{`Gender: ${data?.gender}`}</Typography>
              <Typography variant="body1">{`Status: ${data?.status}`}</Typography>
            </Box>
          </Box>
          <Posts />
        </Box>
      </BaseCard>
    </Box>
  );
};
