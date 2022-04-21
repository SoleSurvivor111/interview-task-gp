import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SaveAccessTokenModal } from "components/Modals/SaveAccessTokenModal";
import { Button } from "@mui/material";

export function VerticalTabs() {
  const [tabValue, setTabValue] = useState(0);
  const token = localStorage.getItem("token");
  const [isAccessModalOpen, setAccessModalOpen] = useState(!token);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 200,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => setAccessModalOpen(true)}
          variant="contained"
          sx={{ width: "auto", height: "50px", mt: "20px" }}
        >
          Set token
        </Button>
      </Box>
      <SaveAccessTokenModal
        open={isAccessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        onOpen={() => setAccessModalOpen(true)}
      />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: 200,
          height: "100%",
        }}
      >
        <Tab label="Users" to="/users" component={Link} />
        <Tab label="Posts" to="/posts" component={Link} />
      </Tabs>
    </Box>
  );
}
