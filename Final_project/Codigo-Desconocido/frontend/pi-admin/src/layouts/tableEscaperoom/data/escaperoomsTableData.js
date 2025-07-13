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

// @mui material components
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

const useEscaperooms = () => {
  const [escaperooms, setEscaperooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/escaperooms/');
        const data = await response.json();
        setEscaperooms(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching escape rooms:', error);
      }
    };

    fetchData();
  }, []);

  const deleteEscaperoom = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/escaperooms/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setEscaperooms(escaperooms.filter(escaperoom => escaperoom._id !== id));
      } else {
        console.error('Failed to delete escape room');
      }
    } catch (error) {
      console.error('Error deleting escape room:', error);
    }
  };

  return { escaperooms, isLoading, deleteEscaperoom };
};

export default function Data() {
  const { escaperooms, isLoading, deleteEscaperoom } = useEscaperooms();

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

  escaperooms.forEach((escaperoom) =>
    row.push({
      id: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {escaperoom._id}
        </MDTypography>
      ),
      nombre: <Job title={escaperoom.name} />,
      descripcion: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {escaperoom.description}
        </MDTypography>
      ),
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {escaperoom.price}
        </MDTypography>
      ),
      min_players: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {escaperoom.min_players}
        </MDTypography>
      ),
      max_players: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {escaperoom.max_players}
        </MDTypography>
      ),
      difficulty: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {escaperoom.difficulty}
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
            <MDButton variant="text" color="error" onClick={() => deleteEscaperoom(escaperoom._id)}>
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
      { Header: "descripcion", accessor: "descripcion", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "min_players", accessor: "min_players", align: "center" },
      { Header: "max_players", accessor: "max_players", align: "center" },
      { Header: "difficulty", accessor: "difficulty", align: "center" },
      { Header: "acciones", accessor: "botones", align: "center" },
    ],

    rows: row
  };
}
