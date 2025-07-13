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

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect } from 'react';

// @mui material components
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/bookings/');
        const data = await response.json();
        setBookings(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching escape rooms:', error);
      }
    };

    fetchData();
  }, []);

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/bookings/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setBookings(bookings.filter(booking => booking._id !== id));
      } else {
        console.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return { bookings, isLoading, deleteBooking };
};

export default function Data() {
  const { bookings, isLoading, deleteBooking } = useBookings();

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

  bookings.forEach((booking) =>
    row.push({
      id: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {booking._id}
        </MDTypography>
      ),
      id_user: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {booking.id_user}
        </MDTypography>
      ), id_escaperoom: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {booking.id_escaperoom}
        </MDTypography>
      ),
      fecha: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {booking.date}
        </MDTypography>
      ),
      horas: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {booking.hour}
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
            <MDButton variant="text" color="error" onClick={() => deleteBooking(booking._id)}>
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
      { Header: "id_user", accessor: "id_user", align: "left" },
      { Header: "id_escaperoom", accessor: "id_escaperoom", align: "center" },
      { Header: "fecha", accessor: "fecha", align: "center" },
      { Header: "horas", accessor: "horas", align: "center" },
      { Header: "acciones", accessor: "botones", align: "center" },
    ],

    rows: row
  };
}
