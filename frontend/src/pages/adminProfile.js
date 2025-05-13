import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorProfile = ({ vendorId }) => {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    contact: "",
    operationalHours: { open: "", close: "" },
    paymentIntegration: { jazzCashEnabled: false, easyPaisaEnabled: false },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/settings/profile/${vendorId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfile((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === "checkbox" ? checked : value },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/settings/profile/${vendorId}`, profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vendor Profile</h1>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <form style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Profile Details</h3>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Vendor Name"
              style={styles.input}
            />
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Address"
              style={styles.input}
            />
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              placeholder="Contact"
              style={styles.input}
            />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Operational Hours</h3>
            <div style={styles.timeContainer}>
              <input
                type="time"
                name="operationalHours.open"
                value={profile.operationalHours.open}
                onChange={handleChange}
                style={styles.timeInput}
              />
              <input
                type="time"
                name="operationalHours.close"
                value={profile.operationalHours.close}
                onChange={handleChange}
                style={styles.timeInput}
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Payment Integration</h3>
            <div style={styles.checkboxContainer}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="paymentIntegration.jazzCashEnabled"
                  checked={profile.paymentIntegration.jazzCashEnabled}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Enable JazzCash
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="paymentIntegration.easyPaisaEnabled"
                  checked={profile.paymentIntegration.easyPaisaEnabled}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Enable EasyPaisa
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="paymentIntegration.cashOnDeliveryEnabled"
                  checked={profile.paymentIntegration.cashOnDeliveryEnabled}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Enable Cash 
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#117A65")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1ABC9C")}
          >
            Save Profile
          </button>
        </form>
      )}
    </div>
  );
};

// Styles with Advanced Design
const styles = {
    container: {
      maxWidth: "800px",
      margin: "50px auto",
      padding: "30px",
      paddingTop: "150px", // Ensure space below the header
      borderRadius: "10px",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#34495E",
    fontSize: "28px",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    color: "#7f8c8d",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#F8F9FA",
  },
  sectionHeading: {
    color: "#2C3E50",
    marginBottom: "15px",
    fontSize: "18px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
    marginBottom: "15px",
  },
  timeContainer: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  timeInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    transition: "border-color 0.3s",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
  },
  button: {
    width: "100%",
    padding: "15px",
    marginTop: "20px",
    backgroundColor: "#1ABC9C",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default VendorProfile;