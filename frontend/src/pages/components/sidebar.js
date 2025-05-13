import React from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import StoreIcon from "@mui/icons-material/Store";

function Sidebar() {
  const location = useLocation(); // Tracks the current route

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        background: "#2C3E50",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        paddingTop: "30px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          color: "#ECF0F1",
          marginBottom: "20px",
        }}
      >
        Admin Panel
      </h2>
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={{
            backgroundColor: isActive("/dashboard") ? "#1ABC9C" : "transparent",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/analytics"
          sx={{
            backgroundColor: isActive("/analytics") ? "#1ABC9C" : "transparent",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/products"
          sx={{
            backgroundColor: isActive("/products") ? "#1ABC9C" : "transparent",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/recommendation"
          sx={{
            backgroundColor: isActive("/recommendation") ? "#1ABC9C" : "transparent",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Recommendations" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
