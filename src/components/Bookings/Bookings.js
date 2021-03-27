import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/bookings?email=${loggedInUser.email}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      });
  }, [loggedInUser.email]);
  return (
    <div>
      <h3>All Bookings: {bookings.length}</h3>
      {bookings.map((booking) => (
        <li>
          {booking.displayName} <b>From:</b>:{" "}
          {new Date(booking.checkIn).toDateString("dd/MM/yyyy")} <b>To</b>:
          {new Date(booking.checkOut).toDateString("dd/MM/yyyy")}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
