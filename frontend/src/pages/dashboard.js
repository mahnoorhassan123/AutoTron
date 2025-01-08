// src/components/Dashboard.js
import React from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
// Chart.js imports
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      { label: "Orders", backgroundColor: "#3e95cd", data: [12, 19, 3, 5, 2] },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // Ensures the layout takes full viewport height
        overflow: "hidden", // Prevents content overflow
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f4f4f9",
        }}
      >
        <Header />
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Total Orders</Typography>
                  <Typography variant="h2">230</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Sales</Typography>
                  <Typography variant="h2">$12,300</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Users</Typography>
                  <Typography variant="h2">1,200</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div style={{ marginTop: "40px" }}>
            <h3>Sales Overview</h3>
            <Bar data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;