// @mui material components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
import authorsTableData from "layouts/tableCliente/data/clientsTableData";

function TableCliente() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');
  const [friends, setFriends] = useState('');

  useEffect(() => {
    const datosLoginNombre = sessionStorage.getItem('datosloginRole');
    if (datosLoginNombre !== "Admin") {
      window.location.reload();
      navigate('/');
    }
  }, [navigate]);

  const { columns, rows } = authorsTableData();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const clientData = {
      name,
      email,
      role,
      description,
      avatar,
      // friends: friends.split(',').map(friend => friend.trim())
    };
    console.log(clientData.email)
    
    try {
      const response = await fetch('http://localhost:8000/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Client created:', data);
      // Optionally, update your table data here to reflect the new client
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
                  Tabla Clientes
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
                      label="Nombre"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <MDInput
                      type="email"
                      label="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBox>
                      <label htmlFor="role">Rol</label>
                      <select
                        id="role"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </MDBox>
                    <MDInput
                      type="text"
                      label="Descripción"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <MDInput
                      type="text"
                      label="Avatar"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                    />
                    <MDInput
                      type="text"
                      label="Amigos (IDs separados por comas)"
                      value={friends}
                      onChange={(e) => setFriends(e.target.value)}
                    />
                  </MDBox>
                  <MDButton variant="gradient" color="dark" type="submit">
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Nuevo cliente
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

export default TableCliente;
