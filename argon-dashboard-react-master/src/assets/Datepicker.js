import React, { useState } from "react";
import ReactDatetime from "react-datetime";

const Datepicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Invoke the callback function with the selected date
  };

  return (
    <ReactDatetime
      inputProps={{
        placeholder: "Select Date"
      }}
      timeFormat={false}
      onChange={handleDateChange}
    />
  );
};

export default Datepicker;
