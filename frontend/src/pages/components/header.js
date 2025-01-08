// src/components/Header.js
import React from "react";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#2C3E50",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderBottom: "2px solid #34495E",
        zIndex: 1,
        position: "sticky", // Keeps it at the top
        top: 0,
      }}
    >
      <h1
        style={{
          color: "#ECF0F1",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "24px",
          fontWeight: "500",
          margin: 0,
        }}
      >
        Admin Dashboard
      </h1>
      <div
        style={{
          color: "#ECF0F1",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "16px",
          padding: "8px 15px",
          borderRadius: "5px",
          backgroundColor: "#34495E",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1ABC9C")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495E")}
      >
        User Profile
      </div>
    </header>
  );
}

export default Header;