import React from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
// Chart.js imports
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {
  // Dummy data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Visitors",
        data: [30, 45, 50, 75, 90, 100, 120],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4, // Makes the line curved
      },
      {
        label: "Sales",
        data: [20, 35, 40, 60, 80, 95, 110],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8f9fa" }}>
        {/* Header */}
        <Header />

        {/* Page Content */}
        <Box sx={{ flex: 1, padding: "30px" }}>
          {/* Grid for Metrics */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ color: "#6c757d", fontWeight: 500 }}>
                    Total Visitors
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "700", color: "#212529" }}>
                    4,200
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ color: "#6c757d", fontWeight: 500 }}>
                    Total Sales
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "700", color: "#212529" }}>
                    $18,300
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ color: "#6c757d", fontWeight: 500 }}>
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "700", color: "#212529" }}>
                    5.2%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart Section */}
          <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#212529", marginBottom: "20px" }}>
              Visitor and Sales Trends
            </Typography>
            <Box sx={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <Line data={data} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Analytics;