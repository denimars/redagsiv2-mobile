import { useState } from 'react';

const formatIndonesianDate = (date: Date) => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
};

export const useDatePicker = (onDateChange: (date: Date) => void) => {
    const [isDataPickerVisible, setIsDataPickerVisible] = useState(false);
    const [date_, setDate] = useState(formatIndonesianDate(new Date()));

    const handleData = (date: Date) => {
        setDate(formatIndonesianDate(date));
        setIsDataPickerVisible(false);
        onDateChange(date);
    };

    return {
        isDataPickerVisible,
        setIsDataPickerVisible,
        date_,
        handleData
    };
};