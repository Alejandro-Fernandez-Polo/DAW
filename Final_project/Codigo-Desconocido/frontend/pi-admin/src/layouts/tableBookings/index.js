/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Icon from "@mui/material/Icon";

// Data
import authorsTableData from "layouts/tableBookings/data/bookingsTableData";

function TableBookings() {
  const { columns, rows } = authorsTableData();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [escaperoomId, setEscaperoomId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const datosLoginNombre = sessionStorage.getItem('datosloginRole');
    if (datosLoginNombre !== "Admin") {
      navigate('/');
      window.location.reload();
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingData = {
      id_user: userId,
      id_escaperoom: escaperoomId,
      date,
      hour: time // Asegúrate de que el nombre de la propiedad coincida con la esperada por el backend
    };

    try {
      const response = await fetch('http://localhost:8000/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Booking created:', data);
      // Optionally, update your table data here to reflect the new booking
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="medium" color="white">
                  Tabla Reservas
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3} sx={{ borderBottom: 1 }} color="light" >
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <MDTypography variant="h6" fontWeight="light" color="dark" mb={3}>
                    Campos a rellenar
                  </MDTypography>
                  <MDBox display="flex" mb={2} justifyContent="space-between" alignItems="center">
                    <MDInput
                      type="text"
                      label="Id del usuario"
                      required
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    <MDInput
                      type="text"
                      label="Id del escaperoom"
                      required
                      value={escaperoomId}
                      onChange={(e) => setEscaperoomId(e.target.value)}
                    />
                    <MDInput
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <MDInput
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </MDBox>
                  <MDButton variant="gradient" color="dark" type="submit">
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Nueva reserva
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TableBookings;
