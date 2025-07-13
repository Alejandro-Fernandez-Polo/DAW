/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
*/
import React, { useState, useEffect } from 'react';

// Material Dashboard 2 React components
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/clients/');
        const data = await response.json();
        setClients(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchData();
  }, []);

  const deleteClient = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/clients/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setClients(clients.filter(client => client._id !== id));
      } else {
        console.error('Failed to delete client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return { clients, isLoading, deleteClient };
};

export default function Data() {
  const { clients, isLoading, deleteClient } = useClients();

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  let row = [];

  clients.forEach((client) =>
    row.push({
      id: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {client._id}
        </MDTypography>
      ),
      nombre: <Job title={client.name} description={client.description} />,
      email: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {client.email}
        </MDTypography>
      ),
      rol: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={client.role} color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      descripcion: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {client.description}
        </MDTypography>
      ),
      avatar: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {client.avatar}
        </MDTypography>
      ),
      amigos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {client.friends.join(', ')}
        </MDTypography>
      ),
      botones: (
        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <MDBox mr={1}>
            <MDButton variant="text" color="info">
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
          <MDBox mr={1}>
            <MDButton variant="text" color="error" onClick={() => deleteClient(client._id)}>
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
          </MDBox>
        </MDBox>
      ),
    })
  );

  return {
    columns: [
      { Header: "#id", accessor: "id", align: "left" },
      { Header: "nombre", accessor: "nombre", align: "left" },
      { Header: "email", accessor: "email", align: "left" },
      { Header: "rol", accessor: "rol", align: "center" },
      { Header: "descripcion", accessor: "descripcion", align: "center" },
      { Header: "avatar", accessor: "avatar", align: "center" },
      { Header: "amigos", accessor: "amigos", align: "center" },
      { Header: "acciones", accessor: "botones", align: "center" },
    ],

    rows: row
  };
}
