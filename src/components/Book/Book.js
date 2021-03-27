import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });

  const handleCheckInDateChange = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkIn = date;
    setSelectedDate(newDates);
  };

  const handleCheckOutDateChange = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkOut = date;
    setSelectedDate(newDates);
  };

  const handleBooking = () => {
    const newBooking = { ...loggedInUser, ...selectedDate };
    fetch("http://localhost:4000/addBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Let's book a {bedType} Room.</h1>
      <h2>Hello, {loggedInUser.displayName}</h2>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check IN"
            value={selectedDate.checkIn}
            onChange={handleCheckInDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out"
            format="dd/MM/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOutDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button onClick={handleBooking} variant="contained" color="primary">
          Book Now
        </Button>
      </MuiPickersUtilsProvider>
      <Bookings></Bookings>
    </div>
  );
};

export default Book;
