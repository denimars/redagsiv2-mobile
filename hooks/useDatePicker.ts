import { useState } from "react";

export const formatIndonesianDate = (date: Date) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const useDatePicker = (onDateChange?: (date: Date) => void) => {
  const [isDataPickerVisible, setIsDataPickerVisible] = useState(false);

  const handleData = (date: Date) => {
    setIsDataPickerVisible(false);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return {
    isDataPickerVisible,
    setIsDataPickerVisible,
    handleData,
  };
};
