import React, { useEffect, useState } from 'react';
// @mui material components
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
import authorsTableData from "layouts/tableEscaperoom/data/escaperoomsTableData";

function TableEscaperoom() {
  useEffect(() => {
    const form = document.getElementById('formCreateEscaperooms');
    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      try {
        const photoFile = formData.get('photo');
        const photoBase64 = await convertFileToBase64(photoFile);
        formData.set('photo', photoBase64);

        // Mapea el valor en español seleccionado al valor en inglés
        const spanishToEnglishDifficulty = {
          Fácil: 'easy',
          Intermedio: 'intermediate',
          Avanzado: 'advanced'
        };
        const selectedDifficulty = formData.get('difficulty');
        formData.set('difficulty', spanishToEnglishDifficulty[selectedDifficulty]);

        const response = await fetch('http://localhost:8000/escaperooms/', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to create escaperooms');
        }

        const data = await response.json();
        console.log('Escaperooms created:', data);
      } catch (error) {
        console.error('Error creating escaperooms:', error.message);
      }
    };

    form.addEventListener('submit', handleSubmit);

    // Cleanup to avoid multiple event listeners
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  const { columns, rows } = authorsTableData();

  // Función para convertir un archivo a base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
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
                  Tabla Escaperooms
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3} sx={{ borderBottom: 1 }} color="light">
                <MDBox component="form" id="formCreateEscaperooms" role="form" method="POST" action="http://localhost:8000/escaperooms/" encType="application/json">
                  <MDTypography variant="h6" fontWeight="light" color="dark" mb={3}>
                    Campos a rellenar
                  </MDTypography>
                  <MDBox display="flex" mb={2} justifyContent="space-between" alignItems="center">
                    <MDInput type="text" label="Nombre" required name="name" />
                    <MDInput type="text" label="Descripcion" required name="description" />
                    <MDInput type="float" label="Precio" required name="price" />
                    <MDInput type="number" label="Jugadores Mínimos" required name="min_players" />
                    <MDInput type="number" label="Jugadores Máximos" required name="max_players" />

                    {/* Campo de selección de dificultad */}
                    <select name="difficulty" required>
                      <option value="">Seleccione dificultad</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                    <MDInput type="file" label="Foto" required name="photo" />
                  </MDBox>
                  <MDButton variant="gradient" color="dark" type="submit">
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Nuevo escaperoom
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

export default TableEscaperoom;
